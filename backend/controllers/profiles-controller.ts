import { Profile } from "../models/profile";
import { Auth } from "../models/auth";
import { User } from "../models/user";
import { cloudinary } from "../lib/cloudinary";
import { getSHA256ofString } from "../lib/sha256";
import { profilesIndex } from "../lib/algolia";

export async function updateProfile(userId, updatedProfile) {
  if (updatedProfile.nickname) {
    const img = await cloudinary.uploader.upload(updatedProfile.picURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 500,
      height: 500,
    });

    const dataToUpdateProfile = {
      picURL: img.secure_url,
      nickname: updatedProfile.nickname,
      email: updatedProfile.email,
      address: updatedProfile.address,
      location: updatedProfile.location,
      lng: updatedProfile.lng,
      lat: updatedProfile.lat,
    };
    const dataToUpdateAuth = {
      email: updatedProfile.email,
    };
    const dataToUpdateUser = {
      email: updatedProfile.email,
    };

    await Profile.update(dataToUpdateProfile, {
      where: {
        id: userId,
      },
    });
    await Auth.update(dataToUpdateAuth, {
      where: {
        id: userId,
      },
    });
    await User.update(dataToUpdateUser, {
      where: {
        id: userId,
      },
    });

    await profilesIndex
      .partialUpdateObject({
        objectID: userId,
        email: updatedProfile.email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return dataToUpdateProfile;
  }
}

export async function updateProfilePassword(userId, newPassword) {
  const hashedPassword = getSHA256ofString(newPassword);

  const updatedPassword = {
    password: hashedPassword,
  };

  await Profile.update(updatedPassword, {
    where: {
      userId: userId,
    },
  });

  return updatedPassword;
}
