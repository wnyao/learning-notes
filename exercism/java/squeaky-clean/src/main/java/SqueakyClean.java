class SqueakyClean {
  static String clean(String identifier) {
    String str = new String(identifier);

    str = replaceSpaces(str);
    str = convertKebabaCase(str);
    str = converLeatSpeak(str);

    return omitNonLetterCharacters(str);
  }

  static String replaceSpaces(String identifier) {
    return new String(identifier).replaceAll("\\s", "_");
  }

  static String convertKebabaCase(String identifier) {
    String str = new String(identifier);

    for (int i = 0; i < str.length(); i++) {
      char c = str.charAt(i);

      if (c == '-') {
        char nc = str.charAt(i + 1);
        str = str.substring(0, i) + Character.toUpperCase(nc) + str.substring(i + 2);
      }
    }

    return str;
  }

  static String converLeatSpeak(String identifier) {
    return new String(identifier)
        .replaceAll("4", "a")
        .replaceAll("3", "e")
        .replaceAll("0", "o")
        .replaceAll("1", "l")
        .replaceAll("7", "t");
  }

  static String omitNonLetterCharacters(String identifier) {
    StringBuilder str = new StringBuilder();

    for (char c : identifier.toCharArray()) {
      if (Character.isLetter(c) || c == '_') {
        str.append(c);
      }
    }

    return str.toString();
  }
}
