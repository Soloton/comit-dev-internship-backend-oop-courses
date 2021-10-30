import { WebDepartment } from "./webDepartment.js";
import { MobileDepartment } from "./mobileDepartment.js";
import { TestDepartment } from "./testDepartment.js";
import { Project } from "./project.js";
import { Developer } from "./developer.js";

export class Company {
  constructor() {
    this.webDepartment = new WebDepartment();
    this.mobileDepartment = new MobileDepartment();
    this.testDepartment = new TestDepartment();
    this._unallocatedProjects = new Map();
    this._projectsInWork = new Map();
    this._doneProjects = [];

    this.hiredDevelopersCount = 0;
    this.firedDevelopersCount = 0;
    this.finishedProjectsCount = 0;
  }

  get doneProjects() {
    return this._doneProjects;
  }

  static runDays(dayCount) {
    const company = new Company();

    const hr = new Array(42).join("-");
    const doubleHr = new Array(42 * 2).join("=");

    /**
     *
     * @param {Project[]} array
     * @param {string || undefined} caption
     */
    function printArray(array, caption = "") {
      if (array.length) {
        if (caption) {
          console.log(`\t${caption}`);
        }
        array.forEach((project, j) =>
          console.log(
            `\t${j + 1} ${project.title} [${project.complexity}*${
              project.isMobile ? "Mob" : "Web"
            } ${project.nextStage}]`
          )
        );
        console.log(`\t${hr}`);
      }
    }

    for (let i = 0; i < dayCount; i++) {
      console.log(doubleHr);
      console.log("Day " + (i + 1));
      console.log(doubleHr);

      // # Начало дня #
      //
      // # *Директор* берёт нераспределённые проекты.
      //   - у директора в компании есть перечень в статусе "Вчерашний" ("Ожидающий")
      console.log("GOOD MORNING!");
      printArray(company.getUnallocatedProjects(), "Yesterday's");
      printArray(company.getProjectsInWorkArray(), "In work");

      // # Директор кидает в каждый *отдел* необходимое количество *программистов*
      //   (по *типам* нераспределённых проектов).
      //   - узнёт в отделах сколько программистов нужно и нанимает нужное количество
      console.log("We hire developers");
      company.hireDevelopers();

      // # Директор распределяет старые проекты по отделам.
      //   - отделы сами разбираются со своими возможностями. Скормим отделам
      //     массив проектов, они возвратят только те, что они не могут взять в
      //     работу.
      console.log("We distribute yesterday's projects");
      company.allocateUnallocatedProjects();
      printArray(company.getUnallocatedProjects(), "Unallocated");
      printArray(company.getProjectsInWorkArray(), "In work");

      // # Директор берёт новые проекты (от 0 до 4).
      console.log("Get daily new projects");
      const newProjects = company.getNewProjects();

      printArray(newProjects, "New projects");

      // # Директор распределяет новые проекты по отделам. Проекты могут не
      //   распределиться, если нет свободных подходящих программистов.
      //   Тогда они останутся на следующий день, в нераспределённых
      console.log("Add new projects, distribute them");
      company.addUnallocated(newProjects);
      company.allocateUnallocatedProjects();
      printArray(company.getUnallocatedProjects(), "Yesterday's");
      printArray(company.getProjectsInWorkArray(), "In work");
      // # Отделы делают работу, переводя проекты в следующий *статус*
      //   в зависимости от требований проекта и работающих над ним программистов.
      //   В результате этого могут высвободиться разработчики в том или ином
      //   отделе (висят в отделе).

      console.log("Ticking during the day on projects and developers");
      company.tickDay();
      // # Директор берёт самого непытного программиста из тех, кто не работает
      //   больше 3 дней и увольняет его одного.

      console.log("Fire the loser");
      const fireLooser = company.fireLooser();
      if (fireLooser) {
        console.log(
          `${fireLooser.title} has been idle for ${fireLooser.daysWithoutWork} days,` +
            ` participated in ${fireLooser.projectsCount} projects`
        );
      }

      printArray(company.doneProjects, "Completed projects");

      console.log("GOOD EVENING!");

      // # Конец дня #
    }

    console.log(doubleHr);
    console.log(`Completed projects:\t${company.finishedProjectsCount}`);
    console.log(`Hired developers:\t${company.hiredDevelopersCount}`);
    console.log(`Fired developers:\t${company.firedDevelopersCount}`);
    console.log(doubleHr);
  }

  /**
   * Набор новых проектов
   * @returns {Project[]}
   */
  getNewProjects() {
    return Project.generate(Math.floor(Math.random() * 3) + 1);
  }

  /**
   * Add projects to unallocated
   * @param {Project[]} projects
   */
  addUnallocated(projects) {
    if (projects && Array.isArray(projects)) {
      projects.forEach((x) => {
        this._unallocatedProjects.set(x, NaN);
      });
    }
  }

  /**
   *
   * @returns {Project[]}
   */
  getProjectsInWorkArray() {
    return Array.from(this._projectsInWork.keys());
  }

  /**
   *
   * @returns {Project[]}
   */
  getUnallocatedProjects() {
    return Array.from(this._unallocatedProjects.keys());
  }

  /**
   * transfer of projects by department to work
   * @param {Map} projects
   * @constructor
   */
  allocateProjects(projects) {
    this._projectsInWork = new Map([
      ...this._projectsInWork,
      ...this.mobileDepartment.allocateProject(projects),
      ...this.webDepartment.allocateProject(projects),
      ...this.testDepartment.allocateProject(projects),
    ]);
  }

  /**
   * Передача нераспределённых проектов по отделам в работу
   */
  allocateUnallocatedProjects() {
    this.allocateProjects(this._unallocatedProjects);
  }

  /**
   * Увольнение неудачника
   * @returns {Developer || undefined}
   */
  fireLooser() {
    const developersArray = [
      ...this.mobileDepartment.freeDevelopers,
      ...this.webDepartment.freeDevelopers,
      ...this.testDepartment.freeDevelopers,
    ];

    if (!developersArray.length) {
      return;
    }

    let developer;

    developersArray
      .sort((a, b) => {
        return b.projectsCount - a.projectsCount;
      })
      .forEach(([k]) => {
        if (!k) {
          return;
        }
        if (k instanceof Developer && k.daysWithoutWork > 3) {
          developer = k;
        }
      });

    if (developer) {
      if (this.mobileDepartment.freeDevelopers.delete(developer)) {
        this.firedDevelopersCount++;
        return developer;
      }
      if (this.webDepartment.freeDevelopers.delete(developer)) {
        this.firedDevelopersCount++;
        return developer;
      }
      if (this.testDepartment.freeDevelopers.delete(developer)) {
        this.firedDevelopersCount++;
        return developer;
      }
    }
  }

  /**
   * Hiring employees in departments for unallocated projects
   */
  hireTotalDevelopers() {
    const unallocatedProjects = this.getUnallocatedProjects();
    unallocatedProjects.forEach((project) => {
      switch (project.nextStage) {
        case sharedEnumProjectStage.development:
          if (project.isMobile) {
            this.hiredDevelopersCount += this.mobileDepartment.hireDevelopers();
          } else {
            this.hiredDevelopersCount += this.webDepartment.hireDevelopers(
              project.complexity
            );
          }
          break;
        case sharedEnumProjectStage.testing:
          this.hiredDevelopersCount += this.testDepartment.hireDevelopers();
          break;
      }
    });
  }

  tickDay() {
    this.tickProjects();
    this.tickDevelopers();
  }

  tickDevelopers() {
    this.webDepartment.tickDevelopers();
    this.mobileDepartment.tickDevelopers();
    this.testDepartment.tickDevelopers();
  }

  tickProjects() {
    if (
      !(
        this._projectsInWork &&
        this._projectsInWork instanceof Map &&
        this._projectsInWork.size > 0
      )
    ) {
      return;
    }

    const doneProjectsToday = [];
    for (let project of this._projectsInWork.keys()) {
      if (!(project && project instanceof Project)) {
        continue;
      }
      project.setNextStage();
      if (project.nextStage === "done") {
        doneProjectsToday.push(project);
      }
    }

    doneProjectsToday.forEach((x) => {
      this._projectsInWork.delete(x);
      this._doneProjects.push(x);
      this.finishedProjectsCount++;
    });
  }
}
