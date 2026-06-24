declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    camelCase(): Rule
  }
}
/*
declare module '@ioc:Adonis/Core/Validator' This targets the exact
internal module where AdonisJS stores its core validation logic.
It opens up the module's types so you can inject your own changes.
*/
