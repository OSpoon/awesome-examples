import { GroupNode } from "@logicflow/extension";

class MyGroup extends GroupNode.view { }

class MyGroupModel extends GroupNode.model {

    setAttributes(): void {
        this.isRestrict = true;
        this.resizable = true;
        this.foldable = true;
    }

    initNodeData(data: any) {
        super.initNodeData(data);
        this.isRestrict = true;
        this.resizable = true;
        this.width = 480;
        this.height = 280;
    }
    getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = "#AEAFAE";
        style.strokeWidth = 1;
        return style;
    }

    getAddableOutlineStyle() {
        const style = super.getAddableOutlineStyle();
        style.stroke = '#AEAFAE';
        style.strokeDasharray = '3 3';
        return style;
    }

    isAllowAppendIn(nodeData: any): boolean {
        // 设置只允许circle节点被添加到此分组中
        return nodeData.type === 'circle'
    }
}

export default {
    type: "my-group",
    model: MyGroupModel,
    view: MyGroup
};
