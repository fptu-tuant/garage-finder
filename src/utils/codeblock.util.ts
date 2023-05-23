export const parseCodeBlockClassName = (
  className: string
): Record<string, string> => {
  if (!/^([\w-]+)(\|\w+=[^\s]+)*$/.test(className)) {
    throw Error(`CodeBlock provide invalid props (${className})`);
  }

  const [language, ...rawProps] = className.replace('language-', '').split('|');

  const props = rawProps.reduce<Record<string, string>>((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;

    return acc;
  }, {});

  return {
    language,
    ...props,
  };
};
