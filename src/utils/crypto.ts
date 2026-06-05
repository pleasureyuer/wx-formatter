/** Fixed salt for MVP key derivation (16 bytes as hex string) */
const FIXED_SALT = 'wx4f6f726d617474';
/** Key derivation iterations */
const PBKDF2_ITERATIONS = 100000;
/** AES key length (256 bits) */
const KEY_LENGTH = 256;
/** IV length (12 bytes for AES-GCM) */
const IV_LENGTH = 12;

/**
 * Derive an AES-256-GCM key from a password using PBKDF2.
 * @param password - The password to derive the key from
 * @param salt - The salt for key derivation (as Uint8Array)
 * @returns A CryptoKey for AES-GCM encryption/decryption
 */
async function deriveKey(
  password: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt'],
  );
}

/**
 * Convert a hex string to a Uint8Array.
 * @param hex - Hex string to convert
 * @returns Uint8Array representation
 */
function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Convert a BufferSource to a Base64 string.
 * @param buffer - BufferSource to convert
 * @returns Base64 encoded string
 */
function bufferToBase64(buffer: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < buffer.byteLength; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
}

/**
 * Convert a Base64 string to a Uint8Array.
 * @param base64 - Base64 string to convert
 * @returns Uint8Array representation
 */
function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encrypt plaintext using AES-256-GCM.
 * Output format: iv:ciphertext (both Base64 encoded).
 * @param plainText - The text to encrypt
 * @param password - The encryption password (defaults to fixed MVP password)
 * @returns Encrypted string in "iv:ciphertext" format
 */
export async function encrypt(
  plainText: string,
  password: string = 'wx-formatter-mvp-key',
): Promise<string> {
  const salt = hexToBuffer(FIXED_SALT);
  const key = await deriveKey(password, salt);
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data,
  );

  const ivBase64 = bufferToBase64(iv);
  const cipherBase64 = bufferToBase64(new Uint8Array(encrypted));

  return `${ivBase64}:${cipherBase64}`;
}

/**
 * Decrypt ciphertext using AES-256-GCM.
 * Input format: iv:ciphertext (both Base64 encoded).
 * @param cipherText - The encrypted string in "iv:ciphertext" format
 * @param password - The decryption password (defaults to fixed MVP password)
 * @returns Decrypted plaintext string
 */
export async function decrypt(
  cipherText: string,
  password: string = 'wx-formatter-mvp-key',
): Promise<string> {
  const salt = hexToBuffer(FIXED_SALT);
  const key = await deriveKey(password, salt);

  const parts = cipherText.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid cipher text format');
  }

  const iv = base64ToBuffer(parts[0]);
  const encrypted = base64ToBuffer(parts[1]);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    encrypted as BufferSource,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}
