export function templateBlock(blockData) {
  return `
        <a class="sideNav-tab-container btn-project" data-blockId="${blockData.id}" data-title="${blockData.title}" data-status="${blockData.status}" data-deadline="${blockData.deadline}">
        <div class="sideNav-tab">
          <div class="sideNav-tab-icon-container">
              <iconify-icon class="sideNav-tab-icon--dashboard" icon="solar:menu-dots-bold" style="display: inline-block; height: 1.5em; width: 1.5em; fill: currentcolor; user-select: none; vertical-align: text-top;"></iconify-icon>
          </div>
          <span class="sideNav-tab-title">${blockData.title}</span>
        </div>
      </a>
    `;
}
