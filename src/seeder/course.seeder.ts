import { createConnection, getManager } from "typeorm";
import { Course } from "../entity/course.entity";
import faker from "faker";
import { CourseCat } from "../entity/courseCat.entity";

createConnection().then(async (result) => { 

    const Repository = getManager().getRepository(Course);
    const CatRepository = getManager().getRepository(CourseCat);

    try {
    await CatRepository.save({
        title: "development",
        description: faker.lorem.paragraph(2),
        image: faker.image.imageUrl(200, 200, '', true),
    });
    await CatRepository.save({
        title: "Management",
        description: faker.lorem.paragraph(2),
        image: faker.image.imageUrl(200, 200, '', true),
    });

    await CatRepository.save({
        title: "Business Inteligence",
        description: faker.lorem.paragraph(2),
        image: faker.image.imageUrl(200, 200, '', true),
    });

    const courseCat  = await CatRepository.find();

    for (let i = 0; i < 5; i++) {
        await Repository.save({
         title: faker.lorem.words(2),
         description: faker.lorem.words(200),
         image: faker.image.imageUrl(200, 200, '', true),
         IsPublished: (i%2 == 0)?true : false,
         courseCat: courseCat[1]
        });
    }

    for (let i = 0; i < 5; i++) {
        await Repository.save({
         title: faker.lorem.words(2),
         description: faker.lorem.paragraph(2),
         image: faker.image.imageUrl(200, 200, '', true),
         IsPublished: (i%2 == 0)?true : false,
         courseCat: courseCat[2]
        });
    }

    for (let i = 0; i < 5; i++) {
        await Repository.save({
         title: faker.lorem.words(2),
         description: faker.lorem.words(200),
         image: faker.image.imageUrl(200, 200, '', true),
         IsPublished: (i%2 == 0)?true : false,
         courseCat: courseCat[0]
        });
    }

    for (let i = 0; i < 5; i++) {
        await Repository.save({
         title: faker.lorem.words(2),
         description: faker.lorem.words(200),
         image: faker.image.imageUrl(200, 200, '', true),
         IsPublished: (i%2 == 0)?true : false,
         courseCat: courseCat[0]
        });
    }

} catch (error) {
    return 0;
}
    process.exit(0)
});