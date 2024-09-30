import crypto from 'crypto';
import { ObjectId } from 'mongodb';

class IDHandler {
  private salt: string;

  constructor() {
    this.salt = crypto.randomBytes(16).toString('hex');
  }

  hashID(id: any): string {
    let idString: string;
    if (id instanceof ObjectId) {
      idString = id.toString();
    } else if (typeof id === 'string') {
      idString = id;
    } else {
      throw new Error('Invalid ID format. Must be string or ObjectId.');
    }
    const hash = crypto.createHmac('sha256', this.salt)
      .update(idString)
      .digest('hex');
    return `${this.salt}:${hash}`;
  }

  dehashID(hashedID: string): string {
    const [salt, hash] = hashedID.split(':');
    if (salt !== this.salt) {
      throw new Error('Invalid salt');
    }
    const originalHash = hash;
    const originalId = crypto.createHmac('sha256', this.salt)
      .update(originalHash)
      .digest('hex');
    return originalId;
  }

  static generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}

export default IDHandler;
