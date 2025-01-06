import * as vscode from 'vscode';

export function activate(_context: vscode.ExtensionContext) {
	const testTree = new TreeDataProvider();
	return { testTree };
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
  public onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;
  private data: TreeItem[] = [];
  private treeView: vscode.TreeView<TreeItem>;

  public constructor() {
	this.generateSeveralNodes();
	this.treeView = vscode.window.createTreeView("tree-item-limits", {
		treeDataProvider: this
	});
  }

  private generateSeveralNodes(): void {
	this.data = new Array(10).fill(0).map((_v, i) => {
		const outer = String.fromCharCode(i + 97);
		return new TreeItem(outer, new Array(100000).fill(0).map((_v, x) => {
			return new TreeItem(`${outer}${String(x)}`);
		}));
	});
  }

  public getTreeItem(element: TreeItem): vscode.TreeItem {
    return element;
  }

  public getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {
      return this.data;
    }
    return element.children;
  }
}

class TreeItem extends vscode.TreeItem {
  children: TreeItem[] | undefined;

  constructor(label: string, children?: TreeItem[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}