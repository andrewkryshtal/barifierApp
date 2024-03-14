type TgetProfineInfo = {
  fields: string;
  access_token: string;
};

type TgetMedia = TgetProfineInfo;

export const getProfileInfo = async ({
  fields,
  access_token,
}: TgetProfineInfo) => {
  try {
    const data = await fetch(
      `https://graph.instagram.com/me?fields=${fields}&access_token=${access_token}`
    );
    const userData = await data.json();

    return userData;
  } catch (e) {
    throw Error("failed to fetch profile info");
  }
};

export const getMediaIds = async ({ fields, access_token }: TgetMedia) => {
  try {
    const data = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${access_token}`
    );
    const mediaIds = await data.json();

    return mediaIds;
  } catch (e) {
    console.log({ e });

    throw Error("failed to fetch media ids");
  }
};

export const getMediaById = async ({
  mediaId,
  access_token,
}: {
  mediaId: number;
  access_token: string;
}) => {
  try {
    const data = await fetch(
      `https://graph.instagram.com/${mediaId}?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`
    );
    const mediaData = data.json();
    return mediaData;
  } catch (e) {
    console.log({ e });

    throw Error("failed to fetch media ids");
  }
};
