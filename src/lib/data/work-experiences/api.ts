import fs from 'fs-extra';
import grayMatter from 'gray-matter';
import path from 'path';
import { frontmatterToWorkExperience } from "./model";
import type WorkExperience from './model';

const MD_FILES_PATH = path.join(process.cwd(), 'cms/work-experiences');

export const getWorkExperience = async (): Promise<WorkExperience[]> => {
  // Read all files in the specified directory and get the .md files
  const fileNames = await fs.readdir(MD_FILES_PATH);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
  // Reverse the array so that the newest files are first
  mdFiles.reverse();

  let items: WorkExperience[] = [];

  for (const mdFile of mdFiles) {
    const fileContent = await fs.readFile(`${MD_FILES_PATH}/${mdFile}`, 'utf-8');
    const parsedData = grayMatter(fileContent);
    items.push(frontmatterToWorkExperience(parsedData.data));
  }

  return items;
}

const careerStart = new Date(2014, 8, 22);
export const yearsOfExperience = Math.abs(
  new Date(Date.now() - careerStart.getTime()).getUTCFullYear() - 1970
);