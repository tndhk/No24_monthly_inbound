
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model MonthlyTravelerStats
 * 
 */
export type MonthlyTravelerStats = $Result.DefaultSelection<Prisma.$MonthlyTravelerStatsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MonthlyTravelerStats
 * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MonthlyTravelerStats
   * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.monthlyTravelerStats`: Exposes CRUD operations for the **MonthlyTravelerStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyTravelerStats
    * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findMany()
    * ```
    */
  get monthlyTravelerStats(): Prisma.MonthlyTravelerStatsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MonthlyTravelerStats: 'MonthlyTravelerStats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "monthlyTravelerStats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MonthlyTravelerStats: {
        payload: Prisma.$MonthlyTravelerStatsPayload<ExtArgs>
        fields: Prisma.MonthlyTravelerStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyTravelerStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyTravelerStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>
          }
          findFirst: {
            args: Prisma.MonthlyTravelerStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyTravelerStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>
          }
          findMany: {
            args: Prisma.MonthlyTravelerStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>[]
          }
          create: {
            args: Prisma.MonthlyTravelerStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>
          }
          createMany: {
            args: Prisma.MonthlyTravelerStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyTravelerStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>[]
          }
          delete: {
            args: Prisma.MonthlyTravelerStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>
          }
          update: {
            args: Prisma.MonthlyTravelerStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyTravelerStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyTravelerStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyTravelerStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyTravelerStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyTravelerStatsPayload>
          }
          aggregate: {
            args: Prisma.MonthlyTravelerStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyTravelerStats>
          }
          groupBy: {
            args: Prisma.MonthlyTravelerStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyTravelerStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyTravelerStatsCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyTravelerStatsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    monthlyTravelerStats?: MonthlyTravelerStatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model MonthlyTravelerStats
   */

  export type AggregateMonthlyTravelerStats = {
    _count: MonthlyTravelerStatsCountAggregateOutputType | null
    _avg: MonthlyTravelerStatsAvgAggregateOutputType | null
    _sum: MonthlyTravelerStatsSumAggregateOutputType | null
    _min: MonthlyTravelerStatsMinAggregateOutputType | null
    _max: MonthlyTravelerStatsMaxAggregateOutputType | null
  }

  export type MonthlyTravelerStatsAvgAggregateOutputType = {
    id: number | null
    year: number | null
    month: number | null
    travelers: number | null
  }

  export type MonthlyTravelerStatsSumAggregateOutputType = {
    id: number | null
    year: number | null
    month: number | null
    travelers: number | null
  }

  export type MonthlyTravelerStatsMinAggregateOutputType = {
    id: number | null
    year: number | null
    month: number | null
    country: string | null
    travelers: number | null
  }

  export type MonthlyTravelerStatsMaxAggregateOutputType = {
    id: number | null
    year: number | null
    month: number | null
    country: string | null
    travelers: number | null
  }

  export type MonthlyTravelerStatsCountAggregateOutputType = {
    id: number
    year: number
    month: number
    country: number
    travelers: number
    _all: number
  }


  export type MonthlyTravelerStatsAvgAggregateInputType = {
    id?: true
    year?: true
    month?: true
    travelers?: true
  }

  export type MonthlyTravelerStatsSumAggregateInputType = {
    id?: true
    year?: true
    month?: true
    travelers?: true
  }

  export type MonthlyTravelerStatsMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    country?: true
    travelers?: true
  }

  export type MonthlyTravelerStatsMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    country?: true
    travelers?: true
  }

  export type MonthlyTravelerStatsCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    country?: true
    travelers?: true
    _all?: true
  }

  export type MonthlyTravelerStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyTravelerStats to aggregate.
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTravelerStats to fetch.
     */
    orderBy?: MonthlyTravelerStatsOrderByWithRelationInput | MonthlyTravelerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyTravelerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTravelerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTravelerStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyTravelerStats
    **/
    _count?: true | MonthlyTravelerStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyTravelerStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyTravelerStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyTravelerStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyTravelerStatsMaxAggregateInputType
  }

  export type GetMonthlyTravelerStatsAggregateType<T extends MonthlyTravelerStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyTravelerStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyTravelerStats[P]>
      : GetScalarType<T[P], AggregateMonthlyTravelerStats[P]>
  }




  export type MonthlyTravelerStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyTravelerStatsWhereInput
    orderBy?: MonthlyTravelerStatsOrderByWithAggregationInput | MonthlyTravelerStatsOrderByWithAggregationInput[]
    by: MonthlyTravelerStatsScalarFieldEnum[] | MonthlyTravelerStatsScalarFieldEnum
    having?: MonthlyTravelerStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyTravelerStatsCountAggregateInputType | true
    _avg?: MonthlyTravelerStatsAvgAggregateInputType
    _sum?: MonthlyTravelerStatsSumAggregateInputType
    _min?: MonthlyTravelerStatsMinAggregateInputType
    _max?: MonthlyTravelerStatsMaxAggregateInputType
  }

  export type MonthlyTravelerStatsGroupByOutputType = {
    id: number
    year: number
    month: number
    country: string
    travelers: number
    _count: MonthlyTravelerStatsCountAggregateOutputType | null
    _avg: MonthlyTravelerStatsAvgAggregateOutputType | null
    _sum: MonthlyTravelerStatsSumAggregateOutputType | null
    _min: MonthlyTravelerStatsMinAggregateOutputType | null
    _max: MonthlyTravelerStatsMaxAggregateOutputType | null
  }

  type GetMonthlyTravelerStatsGroupByPayload<T extends MonthlyTravelerStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyTravelerStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyTravelerStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyTravelerStatsGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyTravelerStatsGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyTravelerStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    country?: boolean
    travelers?: boolean
  }, ExtArgs["result"]["monthlyTravelerStats"]>

  export type MonthlyTravelerStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    country?: boolean
    travelers?: boolean
  }, ExtArgs["result"]["monthlyTravelerStats"]>

  export type MonthlyTravelerStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    country?: boolean
    travelers?: boolean
  }, ExtArgs["result"]["monthlyTravelerStats"]>

  export type MonthlyTravelerStatsSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    country?: boolean
    travelers?: boolean
  }

  export type MonthlyTravelerStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "country" | "travelers", ExtArgs["result"]["monthlyTravelerStats"]>

  export type $MonthlyTravelerStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyTravelerStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      year: number
      month: number
      country: string
      travelers: number
    }, ExtArgs["result"]["monthlyTravelerStats"]>
    composites: {}
  }

  type MonthlyTravelerStatsGetPayload<S extends boolean | null | undefined | MonthlyTravelerStatsDefaultArgs> = $Result.GetResult<Prisma.$MonthlyTravelerStatsPayload, S>

  type MonthlyTravelerStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyTravelerStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyTravelerStatsCountAggregateInputType | true
    }

  export interface MonthlyTravelerStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyTravelerStats'], meta: { name: 'MonthlyTravelerStats' } }
    /**
     * Find zero or one MonthlyTravelerStats that matches the filter.
     * @param {MonthlyTravelerStatsFindUniqueArgs} args - Arguments to find a MonthlyTravelerStats
     * @example
     * // Get one MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyTravelerStatsFindUniqueArgs>(args: SelectSubset<T, MonthlyTravelerStatsFindUniqueArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyTravelerStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyTravelerStatsFindUniqueOrThrowArgs} args - Arguments to find a MonthlyTravelerStats
     * @example
     * // Get one MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyTravelerStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyTravelerStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyTravelerStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsFindFirstArgs} args - Arguments to find a MonthlyTravelerStats
     * @example
     * // Get one MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyTravelerStatsFindFirstArgs>(args?: SelectSubset<T, MonthlyTravelerStatsFindFirstArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyTravelerStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsFindFirstOrThrowArgs} args - Arguments to find a MonthlyTravelerStats
     * @example
     * // Get one MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyTravelerStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyTravelerStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyTravelerStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findMany()
     * 
     * // Get first 10 MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyTravelerStatsWithIdOnly = await prisma.monthlyTravelerStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyTravelerStatsFindManyArgs>(args?: SelectSubset<T, MonthlyTravelerStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyTravelerStats.
     * @param {MonthlyTravelerStatsCreateArgs} args - Arguments to create a MonthlyTravelerStats.
     * @example
     * // Create one MonthlyTravelerStats
     * const MonthlyTravelerStats = await prisma.monthlyTravelerStats.create({
     *   data: {
     *     // ... data to create a MonthlyTravelerStats
     *   }
     * })
     * 
     */
    create<T extends MonthlyTravelerStatsCreateArgs>(args: SelectSubset<T, MonthlyTravelerStatsCreateArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyTravelerStats.
     * @param {MonthlyTravelerStatsCreateManyArgs} args - Arguments to create many MonthlyTravelerStats.
     * @example
     * // Create many MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyTravelerStatsCreateManyArgs>(args?: SelectSubset<T, MonthlyTravelerStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyTravelerStats and returns the data saved in the database.
     * @param {MonthlyTravelerStatsCreateManyAndReturnArgs} args - Arguments to create many MonthlyTravelerStats.
     * @example
     * // Create many MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyTravelerStats and only return the `id`
     * const monthlyTravelerStatsWithIdOnly = await prisma.monthlyTravelerStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyTravelerStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyTravelerStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyTravelerStats.
     * @param {MonthlyTravelerStatsDeleteArgs} args - Arguments to delete one MonthlyTravelerStats.
     * @example
     * // Delete one MonthlyTravelerStats
     * const MonthlyTravelerStats = await prisma.monthlyTravelerStats.delete({
     *   where: {
     *     // ... filter to delete one MonthlyTravelerStats
     *   }
     * })
     * 
     */
    delete<T extends MonthlyTravelerStatsDeleteArgs>(args: SelectSubset<T, MonthlyTravelerStatsDeleteArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyTravelerStats.
     * @param {MonthlyTravelerStatsUpdateArgs} args - Arguments to update one MonthlyTravelerStats.
     * @example
     * // Update one MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyTravelerStatsUpdateArgs>(args: SelectSubset<T, MonthlyTravelerStatsUpdateArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyTravelerStats.
     * @param {MonthlyTravelerStatsDeleteManyArgs} args - Arguments to filter MonthlyTravelerStats to delete.
     * @example
     * // Delete a few MonthlyTravelerStats
     * const { count } = await prisma.monthlyTravelerStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyTravelerStatsDeleteManyArgs>(args?: SelectSubset<T, MonthlyTravelerStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyTravelerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyTravelerStatsUpdateManyArgs>(args: SelectSubset<T, MonthlyTravelerStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyTravelerStats and returns the data updated in the database.
     * @param {MonthlyTravelerStatsUpdateManyAndReturnArgs} args - Arguments to update many MonthlyTravelerStats.
     * @example
     * // Update many MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyTravelerStats and only return the `id`
     * const monthlyTravelerStatsWithIdOnly = await prisma.monthlyTravelerStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyTravelerStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyTravelerStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyTravelerStats.
     * @param {MonthlyTravelerStatsUpsertArgs} args - Arguments to update or create a MonthlyTravelerStats.
     * @example
     * // Update or create a MonthlyTravelerStats
     * const monthlyTravelerStats = await prisma.monthlyTravelerStats.upsert({
     *   create: {
     *     // ... data to create a MonthlyTravelerStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyTravelerStats we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyTravelerStatsUpsertArgs>(args: SelectSubset<T, MonthlyTravelerStatsUpsertArgs<ExtArgs>>): Prisma__MonthlyTravelerStatsClient<$Result.GetResult<Prisma.$MonthlyTravelerStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyTravelerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsCountArgs} args - Arguments to filter MonthlyTravelerStats to count.
     * @example
     * // Count the number of MonthlyTravelerStats
     * const count = await prisma.monthlyTravelerStats.count({
     *   where: {
     *     // ... the filter for the MonthlyTravelerStats we want to count
     *   }
     * })
    **/
    count<T extends MonthlyTravelerStatsCountArgs>(
      args?: Subset<T, MonthlyTravelerStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyTravelerStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyTravelerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyTravelerStatsAggregateArgs>(args: Subset<T, MonthlyTravelerStatsAggregateArgs>): Prisma.PrismaPromise<GetMonthlyTravelerStatsAggregateType<T>>

    /**
     * Group by MonthlyTravelerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyTravelerStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyTravelerStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyTravelerStatsGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyTravelerStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyTravelerStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyTravelerStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyTravelerStats model
   */
  readonly fields: MonthlyTravelerStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyTravelerStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyTravelerStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyTravelerStats model
   */
  interface MonthlyTravelerStatsFieldRefs {
    readonly id: FieldRef<"MonthlyTravelerStats", 'Int'>
    readonly year: FieldRef<"MonthlyTravelerStats", 'Int'>
    readonly month: FieldRef<"MonthlyTravelerStats", 'Int'>
    readonly country: FieldRef<"MonthlyTravelerStats", 'String'>
    readonly travelers: FieldRef<"MonthlyTravelerStats", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyTravelerStats findUnique
   */
  export type MonthlyTravelerStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyTravelerStats to fetch.
     */
    where: MonthlyTravelerStatsWhereUniqueInput
  }

  /**
   * MonthlyTravelerStats findUniqueOrThrow
   */
  export type MonthlyTravelerStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyTravelerStats to fetch.
     */
    where: MonthlyTravelerStatsWhereUniqueInput
  }

  /**
   * MonthlyTravelerStats findFirst
   */
  export type MonthlyTravelerStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyTravelerStats to fetch.
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTravelerStats to fetch.
     */
    orderBy?: MonthlyTravelerStatsOrderByWithRelationInput | MonthlyTravelerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyTravelerStats.
     */
    cursor?: MonthlyTravelerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTravelerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTravelerStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyTravelerStats.
     */
    distinct?: MonthlyTravelerStatsScalarFieldEnum | MonthlyTravelerStatsScalarFieldEnum[]
  }

  /**
   * MonthlyTravelerStats findFirstOrThrow
   */
  export type MonthlyTravelerStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyTravelerStats to fetch.
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTravelerStats to fetch.
     */
    orderBy?: MonthlyTravelerStatsOrderByWithRelationInput | MonthlyTravelerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyTravelerStats.
     */
    cursor?: MonthlyTravelerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTravelerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTravelerStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyTravelerStats.
     */
    distinct?: MonthlyTravelerStatsScalarFieldEnum | MonthlyTravelerStatsScalarFieldEnum[]
  }

  /**
   * MonthlyTravelerStats findMany
   */
  export type MonthlyTravelerStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyTravelerStats to fetch.
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyTravelerStats to fetch.
     */
    orderBy?: MonthlyTravelerStatsOrderByWithRelationInput | MonthlyTravelerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyTravelerStats.
     */
    cursor?: MonthlyTravelerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyTravelerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyTravelerStats.
     */
    skip?: number
    distinct?: MonthlyTravelerStatsScalarFieldEnum | MonthlyTravelerStatsScalarFieldEnum[]
  }

  /**
   * MonthlyTravelerStats create
   */
  export type MonthlyTravelerStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * The data needed to create a MonthlyTravelerStats.
     */
    data: XOR<MonthlyTravelerStatsCreateInput, MonthlyTravelerStatsUncheckedCreateInput>
  }

  /**
   * MonthlyTravelerStats createMany
   */
  export type MonthlyTravelerStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyTravelerStats.
     */
    data: MonthlyTravelerStatsCreateManyInput | MonthlyTravelerStatsCreateManyInput[]
  }

  /**
   * MonthlyTravelerStats createManyAndReturn
   */
  export type MonthlyTravelerStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyTravelerStats.
     */
    data: MonthlyTravelerStatsCreateManyInput | MonthlyTravelerStatsCreateManyInput[]
  }

  /**
   * MonthlyTravelerStats update
   */
  export type MonthlyTravelerStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * The data needed to update a MonthlyTravelerStats.
     */
    data: XOR<MonthlyTravelerStatsUpdateInput, MonthlyTravelerStatsUncheckedUpdateInput>
    /**
     * Choose, which MonthlyTravelerStats to update.
     */
    where: MonthlyTravelerStatsWhereUniqueInput
  }

  /**
   * MonthlyTravelerStats updateMany
   */
  export type MonthlyTravelerStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyTravelerStats.
     */
    data: XOR<MonthlyTravelerStatsUpdateManyMutationInput, MonthlyTravelerStatsUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyTravelerStats to update
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * Limit how many MonthlyTravelerStats to update.
     */
    limit?: number
  }

  /**
   * MonthlyTravelerStats updateManyAndReturn
   */
  export type MonthlyTravelerStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyTravelerStats.
     */
    data: XOR<MonthlyTravelerStatsUpdateManyMutationInput, MonthlyTravelerStatsUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyTravelerStats to update
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * Limit how many MonthlyTravelerStats to update.
     */
    limit?: number
  }

  /**
   * MonthlyTravelerStats upsert
   */
  export type MonthlyTravelerStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * The filter to search for the MonthlyTravelerStats to update in case it exists.
     */
    where: MonthlyTravelerStatsWhereUniqueInput
    /**
     * In case the MonthlyTravelerStats found by the `where` argument doesn't exist, create a new MonthlyTravelerStats with this data.
     */
    create: XOR<MonthlyTravelerStatsCreateInput, MonthlyTravelerStatsUncheckedCreateInput>
    /**
     * In case the MonthlyTravelerStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyTravelerStatsUpdateInput, MonthlyTravelerStatsUncheckedUpdateInput>
  }

  /**
   * MonthlyTravelerStats delete
   */
  export type MonthlyTravelerStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
    /**
     * Filter which MonthlyTravelerStats to delete.
     */
    where: MonthlyTravelerStatsWhereUniqueInput
  }

  /**
   * MonthlyTravelerStats deleteMany
   */
  export type MonthlyTravelerStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyTravelerStats to delete
     */
    where?: MonthlyTravelerStatsWhereInput
    /**
     * Limit how many MonthlyTravelerStats to delete.
     */
    limit?: number
  }

  /**
   * MonthlyTravelerStats without action
   */
  export type MonthlyTravelerStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyTravelerStats
     */
    select?: MonthlyTravelerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyTravelerStats
     */
    omit?: MonthlyTravelerStatsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MonthlyTravelerStatsScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    country: 'country',
    travelers: 'travelers'
  };

  export type MonthlyTravelerStatsScalarFieldEnum = (typeof MonthlyTravelerStatsScalarFieldEnum)[keyof typeof MonthlyTravelerStatsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type MonthlyTravelerStatsWhereInput = {
    AND?: MonthlyTravelerStatsWhereInput | MonthlyTravelerStatsWhereInput[]
    OR?: MonthlyTravelerStatsWhereInput[]
    NOT?: MonthlyTravelerStatsWhereInput | MonthlyTravelerStatsWhereInput[]
    id?: IntFilter<"MonthlyTravelerStats"> | number
    year?: IntFilter<"MonthlyTravelerStats"> | number
    month?: IntFilter<"MonthlyTravelerStats"> | number
    country?: StringFilter<"MonthlyTravelerStats"> | string
    travelers?: IntFilter<"MonthlyTravelerStats"> | number
  }

  export type MonthlyTravelerStatsOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    country?: SortOrder
    travelers?: SortOrder
  }

  export type MonthlyTravelerStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    year_month_country?: MonthlyTravelerStatsYearMonthCountryCompoundUniqueInput
    AND?: MonthlyTravelerStatsWhereInput | MonthlyTravelerStatsWhereInput[]
    OR?: MonthlyTravelerStatsWhereInput[]
    NOT?: MonthlyTravelerStatsWhereInput | MonthlyTravelerStatsWhereInput[]
    year?: IntFilter<"MonthlyTravelerStats"> | number
    month?: IntFilter<"MonthlyTravelerStats"> | number
    country?: StringFilter<"MonthlyTravelerStats"> | string
    travelers?: IntFilter<"MonthlyTravelerStats"> | number
  }, "id" | "year_month_country">

  export type MonthlyTravelerStatsOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    country?: SortOrder
    travelers?: SortOrder
    _count?: MonthlyTravelerStatsCountOrderByAggregateInput
    _avg?: MonthlyTravelerStatsAvgOrderByAggregateInput
    _max?: MonthlyTravelerStatsMaxOrderByAggregateInput
    _min?: MonthlyTravelerStatsMinOrderByAggregateInput
    _sum?: MonthlyTravelerStatsSumOrderByAggregateInput
  }

  export type MonthlyTravelerStatsScalarWhereWithAggregatesInput = {
    AND?: MonthlyTravelerStatsScalarWhereWithAggregatesInput | MonthlyTravelerStatsScalarWhereWithAggregatesInput[]
    OR?: MonthlyTravelerStatsScalarWhereWithAggregatesInput[]
    NOT?: MonthlyTravelerStatsScalarWhereWithAggregatesInput | MonthlyTravelerStatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MonthlyTravelerStats"> | number
    year?: IntWithAggregatesFilter<"MonthlyTravelerStats"> | number
    month?: IntWithAggregatesFilter<"MonthlyTravelerStats"> | number
    country?: StringWithAggregatesFilter<"MonthlyTravelerStats"> | string
    travelers?: IntWithAggregatesFilter<"MonthlyTravelerStats"> | number
  }

  export type MonthlyTravelerStatsCreateInput = {
    year: number
    month: number
    country: string
    travelers: number
  }

  export type MonthlyTravelerStatsUncheckedCreateInput = {
    id?: number
    year: number
    month: number
    country: string
    travelers: number
  }

  export type MonthlyTravelerStatsUpdateInput = {
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
    travelers?: IntFieldUpdateOperationsInput | number
  }

  export type MonthlyTravelerStatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
    travelers?: IntFieldUpdateOperationsInput | number
  }

  export type MonthlyTravelerStatsCreateManyInput = {
    id?: number
    year: number
    month: number
    country: string
    travelers: number
  }

  export type MonthlyTravelerStatsUpdateManyMutationInput = {
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
    travelers?: IntFieldUpdateOperationsInput | number
  }

  export type MonthlyTravelerStatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    country?: StringFieldUpdateOperationsInput | string
    travelers?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type MonthlyTravelerStatsYearMonthCountryCompoundUniqueInput = {
    year: number
    month: number
    country: string
  }

  export type MonthlyTravelerStatsCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    country?: SortOrder
    travelers?: SortOrder
  }

  export type MonthlyTravelerStatsAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    travelers?: SortOrder
  }

  export type MonthlyTravelerStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    country?: SortOrder
    travelers?: SortOrder
  }

  export type MonthlyTravelerStatsMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    country?: SortOrder
    travelers?: SortOrder
  }

  export type MonthlyTravelerStatsSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    travelers?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}