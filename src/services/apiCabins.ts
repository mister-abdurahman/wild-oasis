import { createClient } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  //.select("*, cabins(*), guests(*)"); //also select cabins and guests details using thier ids

  if (error) {
    console.error(error);
    throw new Error("An error occured");
  }

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  console.log("image var is...:", newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // create cabin

  const imageName = `${Math.random()}-${newCabin.name.replaceAll("/", "")}`;
  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query: any = supabase.from("cabins");

  // create cabin:
  if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);

  // edit cabin:
  if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // if image already exists, do not upload again:
  if (hasImagePath) return data;

  // upload image to bucket
  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error(
      "An error occured while uploading image to storage bucket and cabin was not created."
    );
  }

  return data;
};

export const deleteCabin = async (id: string) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
};
