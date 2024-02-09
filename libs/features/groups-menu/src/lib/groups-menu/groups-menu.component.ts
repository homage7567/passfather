import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { BehaviorSubject, take } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Kdbx, KdbxGroup } from 'kdbxweb';
import { getSelectedDB } from '@pf/core';

@UntilDestroy()
@Component({
  selector: 'pf-groups-menu',
  standalone: true,
  imports: [CommonModule, TreeModule],
  templateUrl: './groups-menu.component.html',
  styleUrl: './groups-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsMenuComponent {
  public readonly db$ = this.store.select(getSelectedDB);
  public readonly treeNodes$ = new BehaviorSubject<TreeNode[]>([]);

  public selectedFile: TreeNode | TreeNode[] | null = null;

  constructor(private readonly store: Store) {
    this.db$.pipe(untilDestroyed(this)).subscribe(db => {
      if (!db) {
        return;
      }

      this.prepareMenuTable(db);
    });
  }

  public onSelected(treeNode: TreeNodeSelectEvent): void {
    let db: Readonly<Kdbx> | undefined;

    this.db$.pipe(take(1), untilDestroyed(this)).subscribe(val => (db = val));

    if (db) {
      const group = db.getGroup(treeNode.node.key!);

      // eslint-disable-next-line no-console
      console.log(group);
    }
  }

  private prepareMenuTable(db: Readonly<Kdbx>) {
    const treeNodes: TreeNode[] = [];

    const groups: KdbxGroup[] = db.groups;

    for (const group of groups) {
      treeNodes.push(this.prepareTreeNode(group));
    }

    this.treeNodes$.next(treeNodes);
  }

  private prepareTreeNode(group: KdbxGroup, expandedLevel = 1): TreeNode {
    const treeNode: TreeNode = {
      key: group.uuid.id,
      label: group.name,
      data: { group },
      expanded: expandedLevel > 0
    };

    expandedLevel--;

    treeNode.children = [];

    for (const childGroup of group.groups) {
      treeNode.children.push(this.prepareTreeNode(childGroup));
    }

    return treeNode;
  }
}
