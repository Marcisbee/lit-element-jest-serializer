const { TemplateResult } = require('lit-element');

const serializer = {
  test(value) {
    return value instanceof TemplateResult;
  },

  print(value) {
    return value.strings
      .reduce((acc, string, index) => {
        let parsedValue = value.values[index];

        if (parsedValue instanceof TemplateResult) {
          parsedValue = serializer.print(parsedValue);
        }

        if (typeof parsedValue === 'object' && parsedValue) {
          parsedValue = JSON.stringify(parsedValue);
        }

        if (parsedValue instanceof Function) {
          parsedValue = `[Function ${parsedValue.name}]`;
        }

        return acc.concat(string, parsedValue);
      }, [])
      .join('');
  },
};

module.exports = serializer;
