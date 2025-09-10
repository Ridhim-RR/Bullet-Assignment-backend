// file: controllers/media.js (Updated)

const Media = require("../../models/Media");
const Episode = require("../../models/Episode");

exports.getAllMedia = async (req, res) => {
  try {
    const allMovies = await Media.findAll({
      include: [
        {
          model: Episode,
          attributes: [
            "id",
            "title",
            "video_url",
            "description",
            "episode_number",
          ],
          order: [["episode_number", "ASC"]],
        },
      ],
    });

    // Group movies by language
    const sectionsMap = {};
    allMovies.forEach((movie) => {
      const lang = movie.language || "Unknown";
      if (!sectionsMap[lang]) sectionsMap[lang] = [];
      sectionsMap[lang].push({
        title: movie.title,
        image: movie.image,
        year: movie.year,
        rating: movie.rating,
        episodes: (movie.Episodes || []).map((ep) => ({
          ...ep.dataValues,
          video: ep.video_url,
        })),
      });
    });

    // Convert to array format expected by frontend
    const sections = Object.entries(sectionsMap).map(([title, movies]) => ({
      title,
      movies,
    }));

    res.json(sections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getSingleMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;

    // Use 'include' to fetch the related episodes automatically
    const mediaItem = await Media.findByPk(mediaId, {
      include: [
        {
          model: Episode,
          attributes: [
            "id",
            "title",
            "video_url",
            "description",
            "episode_number",
          ],
          order: [["episode_number", "ASC"]], // Sort episodes
        },
      ],
    });

    if (!mediaItem) {
      return res.status(404).json({ msg: "Media item not found" });
    }

    res.json(mediaItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
