import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _secretKey: string = environments.secretKey;

  private hashKey(key: string): string {
    return CryptoJS.SHA256(key).toString();
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this._secretKey).toString();
  }

  private decrypt(cipherText: string): string {
    return CryptoJS.AES.decrypt(cipherText, this._secretKey).toString(CryptoJS.enc.Utf8);
  }

  setItem(key: string, value: any) {
    const encryptedKey = this.hashKey(key);
    const encryptedValue = this.encrypt(JSON.stringify(value));
    localStorage.setItem(encryptedKey, encryptedValue);
  }

  getItem<T = any>(key: string): T | null {
    const encryptedKey = this.hashKey(key);
    const encryptedValue = localStorage.getItem(encryptedKey);

    if (!encryptedValue) return null;
    const decryptedValue = this.decrypt(encryptedValue);

    try {
      return JSON.parse(decryptedValue);
    } catch {
      return decryptedValue as T;
    }
  }

  removeItem(key: string) {
    const encryptedKey = this.hashKey(key);
    localStorage.removeItem(encryptedKey);
  }

  clear() {
    localStorage.clear();
  }
}
