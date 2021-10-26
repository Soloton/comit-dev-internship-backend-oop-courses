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
      if (array && Array.isArray(array) && array.length > 0) {
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
      console.log("День " + (i + 1));
      console.log(doubleHr);

      // # Начало дня #
      //
      // # *Директор* берёт нераспределённые проекты.
      //   - у директора в компании есть перечень в статусе "Вчерашний" ("Ожидающий")
      console.log("УТРО ДОБРОЕ!");
      printArray(company.getUnallocatedProjects(), "Вчерашние");
      printArray(company.getProjectsInWorkArray(), "В работе");

      // # Директор кидает в каждый *отдел* необходимое количество *программистов*
      //   (по *типам* нераспределённых проектов).
      //   - узнёт в отделах сколько программистов нужно и нанимает нужное количество
      console.log("Нанимаем");
      company.hireDevelopers();

      // # Директор распределяет старые проекты по отделам.
      //   - отделы сами разбираются со своими возможностями. Скормим отделам
      //     массив проектов, они возвратят только те, что они не могут взять в
      //     работу.
      console.log("Распределяем вчерашние проекты");
      company.allocateUnallocatedProjects();
      printArray(company.getUnallocatedProjects(), "Вчерашние");
      printArray(company.getProjectsInWorkArray(), "В работе");

      // # Директор берёт новые проекты (от 0 до 4).
      console.log("Набираем ежедневные новые проекты");
      const newProjects = company.getNewProjects();

      printArray(newProjects, "Новые проекты");

      // # Директор распределяет новые проекты по отделам. Проекты могут не
      //   распределиться, если нет свободных подходящих программистов.
      //   Тогда они останутся на следующий день, в нераспределённых
      console.log("Добавляем новые проекты распределяем их");
      company.addUnallocated(newProjects);
      company.allocateUnallocatedProjects();
      printArray(company.getUnallocatedProjects(), "Вчерашние");
      printArray(company.getProjectsInWorkArray(), "В работе");
      // # Отделы делают работу, переводя проекты в следующий *статус*
      //   в зависимости от требований проекта и работающих над ним программистов.
      //   В результате этого могут высвободиться разработчики в том или ином
      //   отделе (висят в отделе).

      console.log("Тикаем днём по проектам и разработчикам");
      company.tickDay();
      // # Директор берёт самого непытного программиста из тех, кто не работает
      //   больше 3 дней и увольняет его одного.

      console.log("Увольняем неудачника");
      const fireLooser = company.fireLooser();
      if (fireLooser) {
        console.log(
          `${fireLooser.title} без дела ${fireLooser.daysWithoutWork} дня,` +
            ` был(а) на ${fireLooser.projectsCount} пр.`
        );
      }

      printArray(company.doneProjects, "Завершённые проекты");

      console.log("ВЕЧЕР ДОБРЫЙ!");

      // # Конец дня #
    }

    console.log(doubleHr);
    console.log(`Завершено проектов:\t${company.finishedProjectsCount}`);
    console.log(`Нанято разработчиков:\t${company.hiredDevelopersCount}`);
    console.log(`Уволено разработчиков:\t${company.firedDevelopersCount}`);
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
   * Добавить к проекты к нераспределённым
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
   * Передача проектов по отделам в работу
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

    if (
      developersArray &&
      Array.isArray(developersArray) &&
      developersArray.length <= 0
    ) {
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
   * Найм работников в отделы  на нераспределённые проекты
   */
  hireDevelopers() {
    const unallocatedProjects = this.getUnallocatedProjects();
    unallocatedProjects.forEach((x) => {
      if (x.nextStage === "development") {
        if (x.isMobile) {
          this.hiredDevelopersCount += this.webDepartment.hireDevelopers(
            x.complexity
          );
        } else {
          this.hiredDevelopersCount += this.mobileDepartment.hireDevelopers();
        }
      } else if (x.nextStage === "testing") {
        this.hiredDevelopersCount += this.mobileDepartment.hireDevelopers();
      } else {
        throw new Error();
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
