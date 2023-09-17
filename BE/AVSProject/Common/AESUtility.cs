using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using System.Linq;
using System.Security.Cryptography;
using System.IO;

namespace AVSProject.Common
{
    public static class AESUtility
    {
        public const string DEFAULT_ENCRYPT_KEY_STRING = "AVS";

        private const string SALT_STRING = "Salted__";
        private const int SALT_BYTES_LEN = 8;
        private static Random rand = new Random();

        public static string Encrypt(this string plainText, string passphrase)
        {
            try
            {
                if (string.IsNullOrEmpty(plainText))
                    return string.Empty;

                byte[] passphraseBytes = Encoding.ASCII.GetBytes(passphrase);

                // 8 bytes to salt the key_data during key generation. 
                byte[] salt = RandomBytes(SALT_BYTES_LEN);
                // get key and iv
                int nround = 1;
                DeriveKeyAndIV(passphraseBytes, salt, nround, out byte[] key, out byte[] iv);

                byte[] encrypt = EncryptStringToBytesAes(plainText, key, iv);

                // Inserting SALT_STRING header at the beginning of blocks
                byte[] encryptedBytes = new byte[encrypt.Length + SALT_STRING.Length + SALT_BYTES_LEN];
                Buffer.BlockCopy(SALT_STRING.ToArray(), 0, encryptedBytes, 0, SALT_STRING.Length);
                Buffer.BlockCopy(salt, 0, encryptedBytes, SALT_STRING.Length, SALT_BYTES_LEN);
                Buffer.BlockCopy(encrypt, 0, encryptedBytes, SALT_STRING.Length + SALT_BYTES_LEN, encrypt.Length);

                return Convert.ToBase64String(encryptedBytes);
            }
            catch
            {
                return string.Empty;
            }
        }
        public static string Decrypt(this string encrypted, string passphrase)
        {
            try
            {
                if (string.IsNullOrEmpty(encrypted))
                    return string.Empty;

                byte[] passphraseBytes = Encoding.ASCII.GetBytes(passphrase);
                byte[] salt = new byte[SALT_BYTES_LEN];

                // base 64 decode
                byte[] encryptedBytesWithSalt = Convert.FromBase64String(encrypted);
                // extract salt (first 8 bytes of encrypted)
                byte[] encryptedBytes = new byte[encryptedBytesWithSalt.Length - SALT_STRING.Length - SALT_BYTES_LEN];
                Buffer.BlockCopy(encryptedBytesWithSalt, SALT_STRING.Length, salt, 0, SALT_BYTES_LEN);
                Buffer.BlockCopy(encryptedBytesWithSalt, SALT_STRING.Length + SALT_BYTES_LEN, encryptedBytes, 0, encryptedBytes.Length);
                // get key and iv
                int nround = 1;
                DeriveKeyAndIV(passphraseBytes, salt, nround, out byte[] key, out byte[] iv);
                // Decrypt the buffer
                return DecryptStringFromBytesAes(encryptedBytes, key, iv);
            }
            catch
            {
                return string.Empty;
            }
        }

        private static byte[] RandomBytes(int numberOfResults, int minValue = byte.MinValue, int maxValue = byte.MaxValue)
        {
            // declare array for return values
            byte[] result = new byte[numberOfResults];

            // generate the numbers up to the max number of results required
            for (int i = 0; i < numberOfResults; i++)
            {
                // get next value from random passing in the min and max ranges
                result[i] = (byte)rand.Next(minValue, maxValue);
            }

            return result;
        }

        private static void DeriveKeyAndIV(byte[] data, byte[] salt, int count, out byte[] key, out byte[] iv)
        {
            List<byte> hashList = new List<byte>();

            int preHashLength = data.Length + ((salt != null) ? salt.Length : 0);
            byte[] preHash = new byte[preHashLength];

            Buffer.BlockCopy(data, 0, preHash, 0, data.Length);
            if (salt != null)
                Buffer.BlockCopy(salt, 0, preHash, data.Length, salt.Length);

            SHA1 hash = SHA1.Create();
            byte[] currentHash = hash.ComputeHash(preHash);

            for (int i = 1; i < count; i++)
            {
                currentHash = hash.ComputeHash(currentHash);
            }

            hashList.AddRange(currentHash);

            while (hashList.Count < 48) // for 32-byte key and 16-byte iv
            {
                preHashLength = currentHash.Length + data.Length + ((salt != null) ? salt.Length : 0);
                preHash = new byte[preHashLength];

                Buffer.BlockCopy(currentHash, 0, preHash, 0, currentHash.Length);
                Buffer.BlockCopy(data, 0, preHash, currentHash.Length, data.Length);
                if (salt != null)
                    Buffer.BlockCopy(salt, 0, preHash, currentHash.Length + data.Length, salt.Length);

                currentHash = hash.ComputeHash(preHash);

                for (int i = 1; i < count; i++)
                {
                    currentHash = hash.ComputeHash(currentHash);
                }

                hashList.AddRange(currentHash);
            }
            hash.Clear();
            key = new byte[32];
            iv = new byte[16];
            hashList.CopyTo(0, key, 0, 32);
            hashList.CopyTo(32, iv, 0, 16);
        }

        private static byte[] EncryptStringToBytesAes(string plainText, byte[] key, byte[] iv)
        {
            // Declare the stream used to encrypt to an in memory
            // array of bytes.
            MemoryStream msEncrypt;

            // Declare the RijndaelManaged object
            // used to encrypt the data.
            RijndaelManaged aesAlg = null;

            try
            {
                // Check arguments.
                if (plainText == null || plainText.Length <= 0)
                    throw new ArgumentNullException("plainText");
                if (key == null || key.Length <= 0)
                    throw new ArgumentNullException("key");
                if (iv == null || iv.Length <= 0)
                    throw new ArgumentNullException("iv");

                // Create a RijndaelManaged object
                // with the specified key and IV.
                aesAlg = new RijndaelManaged { Mode = CipherMode.CBC, KeySize = 256, BlockSize = 128 };
                aesAlg.Key = key;
                aesAlg.IV = iv;

                // Create an encryptor to perform the stream transform.
                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                // Create the streams used for encryption.
                msEncrypt = new MemoryStream();
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                    {
                        //Write all data to the stream.
                        swEncrypt.Write(plainText);
                        swEncrypt.Flush();
                        swEncrypt.Close();
                    }
                }
            }
            finally
            {
                // Clear the RijndaelManaged object.
                if (aesAlg != null)
                    aesAlg.Clear();
            }

            // Return the encrypted bytes from the memory stream.
            return msEncrypt.ToArray();
        }

        private static string DecryptStringFromBytesAes(byte[] cipherText, byte[] key, byte[] iv)
        {
            // Declare the string used to hold
            // the decrypted text.
            string plaintext = String.Empty;

            // Declare the RijndaelManaged object
            // used to decrypt the data.
            RijndaelManaged aesAlg = null;

            try
            {
                // Check arguments.
                if (cipherText == null || cipherText.Length <= 0)
                    throw new ArgumentNullException("cipherText");
                if (key == null || key.Length <= 0)
                    throw new ArgumentNullException("key");
                if (iv == null || iv.Length <= 0)
                    throw new ArgumentNullException("iv");

                // Create a RijndaelManaged object
                // with the specified key and IV.
                aesAlg = new RijndaelManaged { Mode = CipherMode.CBC, KeySize = 256, BlockSize = 128 };
                aesAlg.Key = key;
                aesAlg.IV = iv;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                // Create the streams used for decryption.
                using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            // Read the decrypted bytes from the decrypting stream
                            // and place them in a string.
                            plaintext = srDecrypt.ReadToEnd();
                            srDecrypt.Close();
                        }
                    }
                }
            }
            finally
            {
                // Clear the RijndaelManaged object.
                if (aesAlg != null)
                    aesAlg.Clear();
            }
            return plaintext;
        }
    }
}
