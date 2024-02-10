import { inject, Injectable } from '@angular/core';
import { getSelectedDB } from '@pf/core';
import { Store } from '@ngrx/store';
import { KdbxGroup } from 'kdbxweb';
import { TreeNode } from 'primeng/api';
import { filter, map, Observable } from 'rxjs';

@Injectable()
export class GroupsMenuBuilderService {
  private readonly store = inject(Store);
  private readonly db$ = this.store.select(getSelectedDB);

  public makeGroupsTree(): Observable<TreeNode[] | null> {
    return this.db$.pipe(
      filter(db => !!db),
      map(db => db!.groups.map(group => this.prepareTreeNode(group)))
    );
  }

  private prepareTreeNode(group: KdbxGroup, expandedLevel = 1): TreeNode {
    const treeNode: TreeNode = {
      key: group.uuid.id,
      label: group.name,
      data: { group },
      expanded: expandedLevel > 0
    };

    expandedLevel--;

    treeNode.children = group.groups.map(childGroup => this.prepareTreeNode(childGroup, expandedLevel));

    return treeNode;
  }
}
