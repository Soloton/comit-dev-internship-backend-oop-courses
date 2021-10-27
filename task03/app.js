"use strict";

import { Company } from "./company.js";

function runDays(dayCount) {
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
          `\t${j + 1} ${project.title} [${project.type}/*${project.complexity}]`
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
    // todo Узнавать сколько нужно программистов и складывать по отделам
    console.log("Нанимаем");
    company.hireDevelopers();

    // # Директор распределяет старые проекты по отделам.
    //   - отделы сами разбираются со своими возможностями. Скормим отделам
    //     массив проектов, они возвратят только те, что они не могут взять в
    //     работу.
    console.log("Распределяем");
    company.allocateUnallocatedProjects();

    printArray(company.getUnallocatedProjects(), "Вчерашние");
    printArray(company.getProjectsInWorkArray(), "В работе");

    // # Отделы делают работу, переводя проекты в следующий *статус*
    //   в зависимости от требований проекта и работающих над ним программистов.
    //   В результате этого могут высвободиться разработчики в том или ином
    //   отделе (висят в отделе).
    // todo Сделать цикл по тикам проектов
    console.log("Тикаем проектами");
    company.tickProjects();

    // # Директор берёт новые проекты (от 0 до 4).
    console.log("Берём ежедневные новые проекты");
    const newProjects = company.getNewProjects();
    printArray(newProjects, "Новые проекты");

    // # Директор распределяет новые проекты по отделам. Проекты могут не
    //   распределиться, если нет свободных подходящих программистов.
    console.log("Распределяем проекты");
    company.allocateUnallocatedProjects();
    printArray(company.getUnallocatedProjects(), "Вчерашние");
    printArray(company.getProjectsInWorkArray(), "В работе");

    // # Директор записывает нераспределённые проекты
    console.log("Добавляем новые проекты во вчерашние");
    company.addUnallocated(newProjects);
    printArray(company.getUnallocatedProjects(), "Вчерашние");
    printArray(company.getProjectsInWorkArray(), "В работе");

    // # Директор берёт самого непытного программиста из тех, кто не работает
    //   больше 3 дней и увольняет его одного.
    console.log("Увольняем неудачника");
    company.fireLooser();

    console.log("ВЕЧЕР ДОБРЫЙ!");

    // # Конец дня #
  }

  console.log("\n" + doubleHr);
}

const args = process.argv.slice(2);

runDays(+args[0] || 25);
