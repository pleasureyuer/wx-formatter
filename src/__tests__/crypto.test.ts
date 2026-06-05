import { describe, it, expect } from 'vitest';
import { encrypt, decrypt } from '../utils/crypto';

// ---------------------------------------------------------------------------
// Round-trip tests
// ---------------------------------------------------------------------------

describe('crypto - encrypt/decrypt round-trip', () => {
  it('should encrypt and decrypt a simple string', async () => {
    const plaintext = 'Hello, World!';
    const encrypted = await encrypt(plaintext);
    expect(encrypted).toBeTruthy();
    expect(encrypted).toContain(':');

    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe(plaintext);
  });

  it('should encrypt and decrypt JSON strings', async () => {
    const plaintext = JSON.stringify({
      id: 'cfg_1',
      name: 'Test Config',
      appId: 'wx123456',
    });
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe(plaintext);
  });

  it('should encrypt and decrypt empty string', async () => {
    const plaintext = '';
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe('');
  });

  it('should encrypt and decrypt Chinese characters', async () => {
    const plaintext = '你好，世界！公众号排版工具';
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe(plaintext);
  });

  it('should encrypt and decrypt long text', async () => {
    const plaintext = 'A'.repeat(10000);
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe(plaintext);
  });

  it('should produce different ciphertexts for the same plaintext (random IV)', async () => {
    const plaintext = 'Same text';
    const enc1 = await encrypt(plaintext);
    const enc2 = await encrypt(plaintext);
    // IV is random, so ciphertexts should differ
    expect(enc1).not.toBe(enc2);

    // But both should decrypt to the same plaintext
    expect(await decrypt(enc1)).toBe(plaintext);
    expect(await decrypt(enc2)).toBe(plaintext);
  });

  it('should work with a custom password', async () => {
    const plaintext = 'Secret data';
    const password = 'my-custom-password';
    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);
    expect(decrypted).toBe(plaintext);
  });

  it('should fail to decrypt with wrong password', async () => {
    const plaintext = 'Secret data';
    const encrypted = await encrypt(plaintext, 'password-A');

    await expect(decrypt(encrypted, 'password-B')).rejects.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

describe('crypto - error handling', () => {
  it('should throw on invalid ciphertext format (no colon)', async () => {
    await expect(decrypt('invalid-ciphertext')).rejects.toThrow(
      'Invalid cipher text format',
    );
  });

  it('should throw on empty ciphertext', async () => {
    await expect(decrypt('')).rejects.toThrow('Invalid cipher text format');
  });

  it('should throw on ciphertext with too many colons', async () => {
    // "a:b:c" — split gives 3 parts, not 2
    await expect(decrypt('a:b:c')).rejects.toThrow(
      'Invalid cipher text format',
    );
  });

  it('should throw on tampered ciphertext', async () => {
    const encrypted = await encrypt('original text');
    // Tamper with the ciphertext portion
    const [iv, cipher] = encrypted.split(':');
    const tampered = `${iv}:${cipher.slice(0, -4)}XXXX`;
    await expect(decrypt(tampered)).rejects.toThrow();
  });

  it('should throw on invalid base64 in ciphertext', async () => {
    // The IV portion must be valid base64; "!!!invalid!!!" is not
    await expect(decrypt('!!!invalid!!!:!!!also_invalid!!!')).rejects.toThrow();
  });
});
