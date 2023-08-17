//@ts-check
/**
 *@param {any[]} array - Arreglo a resolver
 *@param {(element:any)=>Promise} cb - Función promesa
 */

// Types
type mapAsyncArgs<T, M> = [array: T[], cb: (el: T) => Promise<M>];
type MapAsyncFn = <Element, M>(
  ...param: mapAsyncArgs<Element, M>
) => Promise<M[]>;

export const mapAsync: MapAsyncFn = async (array, cb) => {
  const arrPromises = array.map(cb);
  const arrResolved = await Promise.all(arrPromises);
  return arrResolved;
};

{
  //! EXAMPLE (DELETE THIS)
  /* interface IPrueba {
    name: string;
    creditCard: number;
    pass: number;
  }

  interface IPruebaWithAuth extends IPrueba {
    auth?: string;
  }

  const infoUsers: IPrueba[] = [
    {
      name: 'Cristian',
      creditCard: 976451736,
      pass: 123,
    },
    {
      name: 'Fatima',
      creditCard: 987654321,
      pass: 456,
    },
  ];
  function changeData(data: number): Promise<number> {
    return new Promise(resolve => setTimeout(() => resolve(data * 500), 1000));
  }
  async function makeTransation(credit: number, pass: number) {
    let creditRESULT, passRESULT;
    creditRESULT = await changeData(credit);
    passRESULT = await changeData(pass);
    return `${creditRESULT}-${passRESULT}`;
  }
  async function appWithMapAsync() {
    const resolved = await mapAsync<IPrueba, IPruebaWithAuth>(
      infoUsers,
      async user => {
        const { creditCard, pass } = user;
        const newUser: IPruebaWithAuth = { ...user };
        newUser.auth = await makeTransation(creditCard, pass);
        return newUser;
      }
    );
    console.log({ resolved });
  }
  appWithMapAsync(); */
}
