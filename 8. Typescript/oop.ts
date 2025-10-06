 // Classes - blueprint
 // object - actual thing built from that blue print

class Developer {
    name: string;
    caffeineLevels: number;

    // initialize 
    constructor(name:string) {
        this.name = name;
        this.caffeineLevels = 0;
    }

    // methods
    drinkCoffee(): void {
        this.caffeineLevels += 2;
        console.log(`${this.name} drinks coffee and their new caffeine level is: ${this.caffeineLevels}`);
    }

    code(): void {
        if(this.caffeineLevels > 10 ){
            console.log(`${this.name} is coding like a pro`);
            this.caffeineLevels -= 10;
        } else {
            console.log(`${this.name} needs coffee first`)
        }
    }
}

// create instances 
// object
const juniorDev = new Developer('Dan');
juniorDev.drinkCoffee();
juniorDev.code();

// Encapsulation 
class GitRepository {
    private secretToken: string;
    public repoName: string;
    public commits: number;

    constructor(repoName: string, token: string) {
        this.repoName = repoName;
        this.secretToken = token;
        this.commits = 0;
    }

    public push(message: string): void {
        if(this.authenticate()) {
            this.commits++;
            console.log(`pushed: "${message}" (Total commits: ${this.commits})`)
        }
    }

    private authenticate(): boolean {
        console.log('Authenticating using secret token....')
        return this.secretToken.length > 0;
    }
}

const myRepo = new GitRepository('my-ts-app','1234rtfgvdhwqmjbxc');
myRepo.push("Fixed the bug that only happens on fridays")
// This property is private
// myRepo.secretToken;

// Inheritance
// existing class properties & Methods
class Employee {
    name: string;
    salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    work(): void {
        console.log(`${this.name} is working ...`);
    }
}

class SoftwareEngineer extends Employee {
    programming_lang: string;

    constructor(name: string, salary: number, language: string) {
        super(name, salary); // calls parent constructor 
        this.programming_lang = language;
    }

    work(): void {
        console.log(`${this.name} is writing code in ${this.programming_lang}`)
    }

    debug_code() :void {
        console.log(`${this.name}: It works on my machine!`);
    }
}

class DevOpsEngineer extends Employee{
    cloudProvider: string;

    constructor(name: string, salary: number, cloud: string) {
        super(name, salary); // calls parent constructor 
        this.cloudProvider = cloud;
    }

    work(): void {
        console.log(`${this.name} is deploying code in ${this.cloudProvider}`)
    }

    fixproduction(): void {
        console.log(`${this.name}: Rolling back.... Again😂`)
    }

}

const dev = new SoftwareEngineer("Debby", 80000, "Python");
const ops = new DevOpsEngineer('Isaac', 80000, 'Azure');

dev.work();
dev.debug_code();
ops.work();
ops.fixproduction();

// Polymorphism
// many forms but same method name
// same method but diff implementations
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

// Abstraction 
// hides the comples implementation and shows the necessary stuff
// abstract classes as templatates

abstract class Database { 
    abstract connect(): void;
    abstract query(sql: string) : any;

    // method
    logQuery(sql: string): void {
        console.log(`[log] Executing: ${sql}`);
    }
}

class MySQl extends Database{
    connect(): void {
        console.log('Connected to MySQL...')
    }

    query(sql: string): any {
        this.logQuery(sql);
        return `MySQL returns result: ${sql}`
    }
}

class MongoDB extends Database{
    connect(): void {
        console.log('Connected to MongoDB...')
    }

    query(sql: string): any {
        this.logQuery(sql);
        return `MongoDB returns result: ${sql}`
    }
}

class PostgreSQL extends Database{
    connect(): void {
        console.log('Connected to PostgreSQL...')
    }

    query(sql: string): any {
        this.logQuery(sql);
        return `PostgreSQL returns result: ${sql}`
    }
}

const db: Database = new PostgreSQL();
db.connect();
db.query("SELECT * FROM users WHERE status = 'is_available'")

const mongo_db: Database = new MongoDB();
mongo_db.connect();
mongo_db.query("SELECT * FROM users WHERE status = 'is_available'")

// Interfaces
// contracts - define what a class must have
// methods & properties

interface Developers {
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

class FrontendDev implements Developers {
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

class BackendDev implements Developers {
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

const Shelton: Developers = new FrontendDev("Shelton")
const victor: Developers = new BackendDev("Victor")

// Shelton.fixBug();
victor.writeCode();

// "", ''
// ``