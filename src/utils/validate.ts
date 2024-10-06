export class Validate {
  static Email(mail: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(mail);
  }

  static Password(val: string): boolean {
    // if (
    //   val.length < 8 ||
    //   !/[A-Z]/.test(val) ||
    //   !/[a-z]/.test(val) ||
    //   !/\d/.test(val) ||
    //   !/[!@#$%^&*(),.?":{}|<>]/.test(val)
    // ) {
    //   return false;
    // }

    return true;
  }
}
