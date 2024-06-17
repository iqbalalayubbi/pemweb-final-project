import { tools, i18n } from "./configuration.js";
export class Block extends EditorJS {
  constructor(configuration, updateBlock) {
    super(configuration);
    configuration.tools = tools;
    configuration.i18n = i18n;
    // configuration.onReady = this.renderBlock(blockId);
    configuration.renderBlock = this.renderBlock;
    configuration.saveBlock = this.saveBlock;
    configuration.getAllBlock = this.getAllBlock;
    configuration.updateBlock = this.updateBlock;
    configuration.updateProject = this.updateProject;
    configuration.deleteBlock = this.deleteBlock;
    configuration.getBlockByStatus = this.getBlockByStatus;
    configuration.onChange = updateBlock;
  }

  async getBlockByStatus(username, status) {
    const data = await $.ajax({
      type: "GET",
      url: "../controller/getBlockByStatus.php",
      data: { username, status },
      async: true,
    });

    return data;
  }

  async renderBlock(blockId, username) {
    const data = await $.ajax({
      type: "GET",
      url: "../controller/loadBlock.php",
      data: { blockId, username },
      async: true,
    });

    await this.isReady;
    const blocksData = JSON.parse(data);
    return blocksData;
  }

  async saveBlock(data) {
    const result = await $.ajax({
      type: "POST",
      url: "../controller/saveBlock.php",
      data,
      async: true,
    });
    console.log(result);
  }

  async updateBlock(data) {
    const result = await $.ajax({
      type: "POST",
      url: "../controller/updateBlock.php",
      data,
      async: true,
    });
    return result;
  }

  async updateProject(data) {
    const result = await $.ajax({
      type: "POST",
      url: "../controller/updateProject.php",
      data,
      async: true,
    });
    return result;
  }

  async deleteBlock(data) {
    const result = await $.ajax({
      type: "POST",
      url: "../controller/deleteBlock.php",
      data,
      async: true,
    });
    return result;
  }

  async getAllBlock(username) {
    const result = await $.ajax({
      type: "GET",
      url: "../controller/getAllBlock.php",
      data: { username },
      async: true,
    });

    return result;
  }
}
