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
    configuration.updateTitle = this.updateTitle;
    configuration.deleteBlock = this.deleteBlock;
    configuration.onChange = updateBlock;
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
    await $.ajax({
      type: "POST",
      url: "../controller/saveBlock.php",
      data,
      async: true,
    });
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

  async updateTitle(data) {
    const result = await $.ajax({
      type: "POST",
      url: "../controller/updateTitle.php",
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
