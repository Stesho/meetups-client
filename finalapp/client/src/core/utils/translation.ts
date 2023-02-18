class Translation {
  static empty = new Translation();

  private constructor(
    public readonly id = '',
    public readonly params: Record<string, any> = {},
  ) {}

  static translatedText(id: string, values?: Record<string, any>): Translation {
    return new Translation(id, values);
  }

  static plainText(text: string): Translation {
    return new Translation('text', { text });
  }
}

export default Translation;
