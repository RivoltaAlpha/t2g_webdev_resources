# Object-Oriented Programming in TypeScript

A beginner-friendly guide to OOP concepts with fun, relatable examples!

## Table of Contents

- [Object-Oriented Programming in TypeScript](#object-oriented-programming-in-typescript)
  - [Table of Contents](#table-of-contents)
  - [Classes and Objects](#classes-and-objects)
  - [Encapsulation](#encapsulation)
  - [Inheritance](#inheritance)
  - [Polymorphism](#polymorphism)
  - [Abstraction](#abstraction)
  - [Interfaces](#interfaces)
  - [Practice Exercise 🎯](#practice-exercise-)
  - [Key Takeaways 💡](#key-takeaways-)

---

## Classes and Objects

A **class** is like a blueprint, and an **object** is the actual thing built from that blueprint.

```typescript
class Developer {
  name: string;
  caffeineLevel: number;
  
  constructor(name: string) {
    this.name = name;
    this.caffeineLevel = 0;
  }
  
  drinkCoffee(): void {
    this.caffeineLevel += 20;
    console.log(`${this.name} drinks coffee. Caffeine level: ${this.caffeineLevel}`);
  }
  
  code(): void {
    if (this.caffeineLevel > 0) {
      console.log(`${this.name} is coding like a machine! 💻`);
      this.caffeineLevel -= 10;
    } else {
      console.log(`${this.name} needs coffee first... ☕`);
    }
  }
}

// Creating objects (instances)
const junior = new Developer("Alice");
junior.drinkCoffee();  // Alice drinks coffee. Caffeine level: 20
junior.code();         // Alice is coding like a machine! 💻
```

---

## Encapsulation

**Encapsulation** means hiding internal details and controlling access using `private`, `protected`, and `public`.

```typescript
class GitRepository {
  private secretToken: string;
  public repoName: string;
  protected commits: number;
  
  constructor(repoName: string, token: string) {
    this.repoName = repoName;
    this.secretToken = token;
    this.commits = 0;
  }
  
  // Public method - anyone can use
  public push(message: string): void {
    if (this.authenticate()) {
      this.commits++;
      console.log(`✅ Pushed: "${message}" (Total commits: ${this.commits})`);
    }
  }
  
  // Private method - only this class can use
  private authenticate(): boolean {
    console.log("🔐 Authenticating with secret token...");
    return this.secretToken.length > 0;
  }
  
  // You can't access secretToken from outside!
}

const myRepo = new GitRepository("my-awesome-app", "ghp_secret123");
myRepo.push("Fixed the bug that only happens on Fridays");
// myRepo.secretToken;  // ❌ Error! Property is private
```

---

## Inheritance

**Inheritance** lets you create a new class based on an existing one, inheriting its properties and methods.

```typescript
class Employee {
  name: string;
  salary: number;
  
  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
  
  work(): void {
    console.log(`${this.name} is working...`);
  }
}

class SoftwareEngineer extends Employee {
  programmingLanguage: string;
  
  constructor(name: string, salary: number, language: string) {
    super(name, salary);  // Call parent constructor
    this.programmingLanguage = language;
  }
  
  work(): void {
    console.log(`${this.name} is writing ${this.programmingLanguage} code 👨‍💻`);
  }
  
  debugCode(): void {
    console.log(`${this.name}: "It works on my machine!" 🤷‍♂️`);
  }
}

class DevOpsEngineer extends Employee {
  cloudProvider: string;
  
  constructor(name: string, salary: number, cloud: string) {
    super(name, salary);
    this.cloudProvider = cloud;
  }
  
  work(): void {
    console.log(`${this.name} is deploying to ${this.cloudProvider} ☁️`);
  }
  
  fixProduction(): void {
    console.log(`${this.name}: "Rolling back... again." 😅`);
  }
}

const dev = new SoftwareEngineer("Bob", 80000, "TypeScript");
const ops = new DevOpsEngineer("Carol", 85000, "AWS");

dev.work();           // Bob is writing TypeScript code 👨‍💻
dev.debugCode();      // Bob: "It works on my machine!" 🤷‍♂️
ops.work();           // Carol is deploying to AWS ☁️
ops.fixProduction();  // Carol: "Rolling back... again." 😅
```

---

## Polymorphism

**Polymorphism** means "many forms" - same method name, different implementations.

```typescript
class NotificationService {
    send(message: string): void {
        console.log(`Sending: ${message}`);
    }
}

class EmailNotification extends NotificationService {
    send(message: string): void {
        console.log(`Email📧: ${message}`);
    }
}

class TeamsNotification extends NotificationService {
    send(message: string): void {
        console.log(`Teams🥲: ${message}`);
    }
}

class SlackNotification extends NotificationService {
    send(message: string): void {
        console.log(`Slack💭: ${message}`);
    }
}

function alertTeam(service: NotificationService, message: string) {
    service.send(message);
}

alertTeam(new EmailNotification(), "Production is down🥲🥲😒");
alertTeam(new TeamsNotification(), "Meeting now!!😐");
alertTeam(new SlackNotification(), "Build Succeeds😎😎");
```

---

## Abstraction

**Abstraction** hides complex implementation details and shows only what's necessary. Use `abstract` classes as templates.

```typescript
abstract class Database {
  abstract connect(): void;
  abstract query(sql: string): any;
  
  // Common method for all databases
  logQuery(sql: string): void {
    console.log(`[LOG] Executing: ${sql}`);
  }
}

class MySQL extends Database {
  connect(): void {
    console.log("🐬 Connected to MySQL");
  }
  
  query(sql: string): any {
    this.logQuery(sql);
    return `MySQL result for: ${sql}`;
  }
}

class MongoDB extends Database {
  connect(): void {
    console.log("🍃 Connected to MongoDB");
  }
  
  query(sql: string): any {
    this.logQuery(sql);
    return `MongoDB result for: ${sql}`;
  }
}

class PostgreSQL extends Database {
  connect(): void {
    console.log("🐘 Connected to PostgreSQL");
  }
  
  query(sql: string): any {
    this.logQuery(sql);
    return `PostgreSQL result for: ${sql}`;
  }
}

// You can't do: new Database() ❌
// But you can do:
const db: Database = new PostgreSQL();
db.connect();  // 🐘 Connected to PostgreSQL
db.query("SELECT * FROM bugs WHERE status = 'wont-fix'");
```

---

## Interfaces

**Interfaces** define contracts - what properties and methods a class must have.

```typescript
interface Developer {
    name: string;
    skills: string[];
    writeCode(): void;
    fixBug(): void;
}

interface APIResponse {
    status: number;
    data: any;
    error?: string;
}

class FrontendDev implements Developer {
    name: string;
    skills: string[];

    constructor(name: string) {
        this.name = name;
        this.skills = ['React', 'HTML', 'CSS']
    }

    writeCode(): void {
        console.log(`${this.name} makes websites pretty😎😎😎`);
    }

    fixBug(): void {
        console.log(`${this.name}: Have you tried to restart your machine?😏`);
    }
}

class BackendDev implements Developer {
    name: string;
    skills: string[];

    constructor(name: string) {
        this.name = name;
        this.skills = ['Node.js', 'Nest', 'Django']
    }

    writeCode(): void {
        console.log(`${this.name} build APIs that Frontend Uses😏😏`);
    }

    fixBug(): void {
        console.log(`${this.name}: It's probably a frontend issue😒`);
    }
}

const Shelton: Developer = new FrontendDev("Shelton")
const victor: Developer = new BackendDev("Victor")

Shelton.fixBug();
victor.writeCode();
```

---

## Practice Exercise 🎯

Create a `BugTracker` system with:

1. An abstract `Bug` class with properties: `id`, `title`, `severity`
2. Concrete classes: `FrontendBug`, `BackendBug`, `DatabaseBug`
3. A `BugReport` interface with a `report()` method
4. Make each bug type report itself differently!

---

## Key Takeaways 💡

- **Classes** are blueprints, **objects** are instances
- **Encapsulation** protects data with private/protected/public
- **Inheritance** lets child classes reuse parent code
- **Polymorphism** allows different implementations of the same method
- **Abstraction** hides complexity using abstract classes
- **Interfaces** define contracts that classes must follow
