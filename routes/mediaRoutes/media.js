// file: controllers/media.js (Updated)

const Media = require("../../models/Media");
const Episode = require("../../models/Episode");

exports.getAllMedia = async (req, res) => {
  try {
    const allMedia = await Media.findAll({
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
      order: [["title", "ASC"]],
    });

    // Group media by language (handling multiple languages per media)
    const sectionsMap = {};

    allMedia.forEach((media) => {
      // media.languages is an array, so group the media under each language
      const languages = media.languages.length ? media.languages : ["Unknown"];
      languages.forEach((lang) => {
        if (!sectionsMap[lang]) sectionsMap[lang] = [];

        sectionsMap[lang].push({
          title: media.title,
          image: media.image_url,
          episodes: (media.Episodes || []).map((ep) => ({
            ...ep.dataValues,
            video: ep.video_url,
          })),
        });
      });
    });

    // Convert to array format expected by frontend
    const sections = Object.entries(sectionsMap).map(([language, mediaArray]) => ({
      title: language,
      movies: mediaArray,
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
