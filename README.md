# graphql-js-joda

[![npm](https://img.shields.io/npm/v/graphql-js-joda.svg)](https://www.npmjs.com/package/graphql-js-joda)
[![main](https://github.com/cranberyxl/graphql-joda-types/actions/workflows/quality.yml/badge.svg)](https://github.com/cranberyxl/graphql-joda-types/actions/workflows/quality.yml)
[![publish](https://github.com/cranberyxl/graphql-joda-types/actions/workflows/publish.yml/badge.svg)](https://github.com/cranberyxl/graphql-joda-types/actions/workflows/publish.yml)

> **Fork Notice**: This is a maintained fork of the original [meetup/graphql-joda-types](https://github.com/meetup/graphql-joda-types) package with significant improvements and modern tooling.

A modern JavaScript library providing GraphQL scalar types for [`@js-joda/core`][js-joda] date/time types. This package offers a clean, type-safe way to use Joda date/time types in your GraphQL resolvers with comprehensive error handling and full TypeScript support.

## ✨ Features

- **Modern Architecture**: Built with TypeScript and modern JavaScript tooling
- **Comprehensive Type Support**: All major Joda date/time types included
- **Consistent Error Handling**: All errors use GraphQL standard error types
- **Zero Dependencies**: No runtime dependencies beyond peer dependencies
- **Full TypeScript Support**: Complete type definitions included
- **Modern Build System**: Dual CommonJS/ESM support with source maps
- **Comprehensive Testing**: 50+ tests with explicit assertions (no snapshots)

## 📦 Installation

```bash
npm install graphql-js-joda @js-joda/core graphql
# or
yarn add graphql-js-joda @js-joda/core graphql
```

## 🚀 Supported Types

The following `@js-joda/core` types are supported:

- **`LocalDate`** - A date without time or timezone (e.g., `2023-12-25`)
- **`LocalDateTime`** - A date and time without timezone (e.g., `2023-12-25T14:30:00`)
- **`LocalTime`** - A time without date or timezone (e.g., `14:30:00`)
- **`ZonedDateTime`** - A date and time with timezone (e.g., `2023-12-25T14:30:00-05:00`)
- **`ZoneId`** - A timezone identifier (e.g., `America/New_York`, `UTC`, `+05:30`)
- **`Duration`** - A time-based amount of time (e.g., `PT2H30M`)

## 📖 Usage

### GraphQL Schema

Define your scalar types in your GraphQL schema:

```graphql
scalar LocalDate
scalar LocalDateTime
scalar LocalTime
scalar ZonedDateTime
scalar ZoneId
scalar Duration

type User {
  id: ID!
  name: String!
  birthday: LocalDate
  timezone: ZoneId
  createdAt: ZonedDateTime
  updatedAt: ZonedDateTime
  sessionDuration: Duration
}

type Event {
  id: ID!
  title: String!
  startTime: LocalDateTime
  endTime: LocalDateTime
  timezone: ZoneId
}
```

### GraphQL Server Setup

```typescript
import {
  LocalDate,
  LocalDateTime,
  LocalTime,
  ZonedDateTime,
  ZoneId,
  Duration
} from 'graphql-js-joda';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
  typeDefs: /* your schema */,
  resolvers: {
    // Scalar resolvers
    LocalDate,
    LocalDateTime,
    LocalTime,
    ZonedDateTime,
    ZoneId,
    Duration,

    // Your other resolvers
    Query: {
      // ...
    },
  },
});
```

### Using in Resolvers

```typescript
import { LocalDate, ZonedDateTime, ZoneId } from '@js-joda/core';

const resolvers = {
  Query: {
    user: (_, { id }) => ({
      id,
      name: 'John Doe',
      birthday: LocalDate.of(1990, 5, 15),
      timezone: ZoneId.of('America/New_York'),
      createdAt: ZonedDateTime.now(),
    }),
  },

  Mutation: {
    createEvent: (_, { input }) => {
      const event = {
        id: '1',
        title: input.title,
        startTime: LocalDateTime.parse(input.startTime),
        timezone: ZoneId.of(input.timezone),
      };

      return event;
    },
  },
};
```

## 🔧 Error Handling

All scalar types provide consistent error handling using GraphQL standard error types:

- **Invalid Format**: Returns parsing errors from the Joda library
- **Wrong Type**: Returns custom GraphQL errors for non-string inputs
- **Validation Errors**: Returns descriptive error messages for invalid values

Example error responses:

```json
{
  "errors": [
    {
      "message": "LocalDate can not represent non-string type 123",
      "extensions": {
        "code": "GRAPHQL_VALIDATION_FAILED"
      }
    }
  ]
}
```

## 🏗️ Development

This package is built with modern tooling:

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Jest** for testing
- **tsup** for building
- **Husky** for git hooks

### Scripts

```bash
# Development
yarn test          # Run tests
yarn test:watch    # Run tests in watch mode
yarn typecheck     # Type checking
yarn lint          # Linting
yarn format        # Format code

# Building
yarn build         # Build for production
```

## 🔄 Migration from Original Package

If you're migrating from the original `graphql-joda-types` package:

1. **Update package name**: `graphql-joda-types` → `graphql-js-joda`
2. **Update imports**: The API remains the same
3. **Error handling**: Error messages may be more descriptive
4. **TypeScript**: Full type support is now included

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Original Package](https://github.com/meetup/graphql-joda-types) - The original meetup package
- [@js-joda/core](https://github.com/js-joda/js-joda) - The underlying date/time library
- [GraphQL](https://graphql.org/) - GraphQL specification
- [npm package](https://www.npmjs.com/package/graphql-js-joda) - Install from npm

---

**Note**: This package is a maintained fork with significant improvements over the original. For the original package, see [meetup/graphql-joda-types](https://github.com/meetup/graphql-joda-types).
