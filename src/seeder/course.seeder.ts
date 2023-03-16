import { createConnection, getManager } from "typeorm";
import { Course } from "../entity/course.entity";
import faker from "faker";
import { CourseCat } from "../entity/courseCat.entity";

createConnection().then(async (result) => { 
    const Repository = getManager().getRepository(Course);
    const CatRepository = getManager().getRepository(CourseCat);

    for (let i = 0; i < 30; i++) {
        await Repository.save({
         title: faker.lorem.words(2),
         description: faker.lorem.words(200),
         image: faker.image.imageUrl(200, 200, '', true),
         IsPublished: (i%2 == 0)?true : false
        });
    }
    process.exit(0)
});