declare function openDBConnection(): Promise<unknown>;
declare function getMongoModule(
  Services: unknown[],
  Controllers?: unknown[],
): Promise<unknown>;
declare function closeDBConnection(): Promise<unknown>;

declare type Falsy = false | 0 | '' | null | undefined;
