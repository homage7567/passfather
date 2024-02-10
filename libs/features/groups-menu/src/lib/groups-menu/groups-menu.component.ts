import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { GroupsMenuBuilderService } from './services/groups-menu-builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pf-groups-menu',
  standalone: true,
  imports: [CommonModule, TreeModule],
  templateUrl: './groups-menu.component.html',
  styleUrl: './groups-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GroupsMenuBuilderService]
})
export class GroupsMenuComponent {
  public readonly treeNodes$ = this.groupsMenuBuilderService.makeGroupsTree();

  public selectedFile: TreeNode | TreeNode[] | null = null;

  constructor(
    private readonly router: Router,
    private readonly groupsMenuBuilderService: GroupsMenuBuilderService
  ) {}

  public onSelected(treeNode: TreeNodeSelectEvent): void {
    this.router.navigate(['/', 'database', treeNode.node.key]);
  }
}
