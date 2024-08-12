import { TranslationServiceClient } from "@google-cloud/translate";

const translationClient = new TranslationServiceClient();
const projectId = "pusdip-ai";
const location = "global";

export const translateAbstractToIDN = async (
  abstract: string
): Promise<string> => {
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [abstract],
    mimeType: "text/plain", // mime types: text/plain, text/html
    targetLanguageCode: "id",
  };

  const [response] = await translationClient.translateText(request);

  if (!response.translations) {
    throw new Error("Gagal menerjemahkan abstrak");
  }

  return response.translations
    .map((translation) => translation.translatedText)
    .join(" ");
};
