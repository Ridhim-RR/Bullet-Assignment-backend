require('dotenv').config();
const { sequelize } = require('./config/database');
const Media = require('./models/Media');
const Episode = require('./models/Episode');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // CAUTION: Drops all existing data

    // Hindi Series Data
    const hindiSeries = [
      {
        title: "Andhadhun",
        description: "A pianist becomes embroiled in a series of murders.",
        genres: ["Thriller", "Mystery"],
        languages: ["Hindi"],
        category: "Hindi",
        image_url: "https://example.com/andhadhun.jpg",
      },
      {
        title: "Gully Boy",
        description: "A coming-of-age story set in Mumbai's hip-hop scene.",
        genres: ["Drama", "Music"],
        languages: ["Hindi"],
        category: "Hindi",
        image_url: "https://example.com/gullyboy.jpg",
      },
      {
        title: "Sacred Games",
        description: "A police officer looks into the underground world of crime in Mumbai.",
        genres: ["Crime", "Thriller"],
        languages: ["Hindi"],
        category: "Hindi",
        image_url: "https://example.com/sacredgames.jpg",
      },
      {
        title: "Mirzapur",
        description: "Story of mafia, lawlessness and crime in Mirzapur city.",
        genres: ["Action", "Crime"],
        languages: ["Hindi"],
        category: "Hindi",
        image_url: "https://example.com/mirzapur.jpg",
      },
    ];

    // Bengali Series Data
    const bengaliSeries = [
      {
        title: "Byomkesh",
        description: "Detective Byomkesh Bakshi solves crimes in 1930s Calcutta.",
        genres: ["Mystery", "Detective"],
        languages: ["Bengali"],
        category: "Bengali",
        image_url: "https://example.com/byomkesh.jpg",
      },
      {
        title: "Feluda",
        description: "Satyajit Ray's iconic sleuth solves intellectual mysteries.",
        genres: ["Detective", "Adventure"],
        languages: ["Bengali"],
        category: "Bengali",
        image_url: "https://example.com/feluda.jpg",
      },
      {
        title: "Eken Babu",
        description: "A quirky detective cracks the most unusual cases.",
        genres: ["Comedy", "Mystery"],
        languages: ["Bengali"],
        category: "Bengali",
        image_url: "https://example.com/ekenbabu.jpg",
      },
      {
        title: "Rogues of Calcutta",
        description: "An ensemble tale set in the bustling lanes of old Calcutta.",
        genres: ["Drama", "Crime"],
        languages: ["Bengali"],
        category: "Bengali",
        image_url: "https://example.com/roguesofcalcutta.jpg",
      },
    ];

    // Helper to generate episodes
    const createEpisodes = async (media, baseTitle) => {
      for (let i = 1; i <= 4; i++) {
        await Episode.create({
          title: `${baseTitle} Episode ${i}`,
          description: `Episode ${i} of ${baseTitle}.`,
          video_url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
          episode_number: i,
          media_id: media.id,
        });
      }
    };

    // Create Hindi series and episodes
    for (const show of hindiSeries) {
      const media = await Media.create(show);
      await createEpisodes(media, show.title);
    }

    // Create Bengali series and episodes
    for (const show of bengaliSeries) {
      const media = await Media.create(show);
      await createEpisodes(media, show.title);
    }

    console.log("Seeded 4 Hindi and 4 Bengali series with 4 episodes each ✅");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
