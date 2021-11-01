import { Company } from "./company.js";

Company.runDays(+process.argv.slice(2)[0] || 25);
