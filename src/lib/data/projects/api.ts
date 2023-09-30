import fs from 'fs-extra';
import grayMatter from 'gray-matter';
import path from 'path';
import { frontmatterToProject } from "./model";
import type Project from './model';

const MD_FILES_PATH = path.join(process.cwd(), 'cms/projects');

export const getProjects = async (): Promise<Project[]> => {
  // Read all files in the specified directory and get the .md files
  const fileNames = await fs.readdir(MD_FILES_PATH);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));
  // Reverse the array so that the newest files are first
  mdFiles.reverse();

  let items: Project[] = [];

  for (const mdFile of mdFiles) {
    const fileContent = await fs.readFile(`${MD_FILES_PATH}/${mdFile}`, 'utf-8');
    const parsedData = grayMatter(fileContent);
    items.push(frontmatterToProject(parsedData.data));
  }

  return items;
}