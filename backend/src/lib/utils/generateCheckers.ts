import { check } from 'express-validator';
import { ValidationChain } from 'express-validator/src/chain/validation-chain';

interface IGenerateCheckersFields<T> {
  validType: 'email' | 'numeric' | 'string';
  fieldNames: T[];
}

interface IGenerateCheckers<T> {
  fields: IGenerateCheckersFields<T>[];
  optionals?: T[];
}

type GenerateCheckersFn = <T extends string>(
  validators: IGenerateCheckers<T>
) => ValidationChain[];

type GenValidatorParams = [
  checkers: ValidationChain[],
  validator: IGenerateCheckersFields<string>,
  message: string,
  cbString: 'isEmail' | 'isNumeric' | 'isString',
  validators: IGenerateCheckers<string>
];
type GenValidatorFn = (...params: GenValidatorParams) => void;

function addOptionalField(arr: ValidationChain[]) {
  const obj = arr.slice(-1)[0];
  obj['optional']();
}

function addRequiredField(arr: ValidationChain[], field: string) {
  const message = `The ${field} is required`;
  arr.push(check(`${field}`, message).not().isEmpty());
}

const genValidator: GenValidatorFn = (
  checkers,
  validator,
  message,
  cbString,
  validators
) => {
  validator.fieldNames.forEach(fieldName => {
    if (!validators.optionals?.includes(fieldName))
      addRequiredField(checkers, fieldName);
    const mess = `The ${fieldName} ${message}`;
    checkers.push(check(fieldName, mess)[`${cbString}`]());
    if (validators.optionals?.includes(fieldName)) addOptionalField(checkers);
  });
};

// Genera checkers a partir de los tipos numeric, email y string
export const generateCheckers: GenerateCheckersFn = validators => {
  const checkers: ValidationChain[] = [];
  checkers.push(check('stri', 'the stru must be'));
  validators.fields.forEach(validator => {
    const { validType } = validator;
    let message;

    if (validType === 'email') {
      message = `must be a valid email address`;
      genValidator(checkers, validator, message, 'isEmail', validators);
    }
    if (validType === 'numeric') {
      message = `must be a number`;
      genValidator(checkers, validator, message, 'isNumeric', validators);
    }
    if (validType === 'string') {
      message = `must be a string`;
      genValidator(checkers, validator, message, 'isString', validators);
    }
  });
  return checkers;
};

generateCheckers({
  fields: [
    { validType: 'email', fieldNames: ['email', 'emailUserTo', 'jajajaja'] },
    { validType: 'numeric', fieldNames: ['oooooooooo'] },
  ],
  optionals: [''],
});

//TODO: Generar una lógica de tipos para IGenerateCheckers donde "optionals" sea solamente lo que se tenga en los campos "fieldNames"
