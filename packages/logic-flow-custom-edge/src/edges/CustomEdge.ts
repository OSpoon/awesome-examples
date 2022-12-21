import { EdgeData, h, PolylineEdge, PolylineEdgeModel } from "@logicflow/core";

type ExtendEdgeData = {
    sourceAnchorId: string;
    targetAnchorId: string
} & EdgeData & { pointsList: { x: any; y: any; }[]; }

class CustomEdgeNode extends PolylineEdge {
    getEndArrow() {
        const { model } = this.props;
        const { properties: { arrowType } } = model;
        const { stroke, strokeWidth } = this.getArrowStyle();
        const pathAttr = {
            stroke,
            strokeWidth
        }
        if (arrowType === 'empty') {  // 空心箭头
            return h('path', {
                ...pathAttr,
                fill: '#FFF',
                d: 'M -10 0  -20 -5 -30 0 -20 5 z'
            })
        } else if (arrowType === 'half') { // 半箭头
            return (
                h('path', {
                    ...pathAttr,
                    d: 'M 0 0 -10 5'
                })
            )
        }
        return h('path', {
            ...pathAttr,
            d: 'M 0 0 -10 -5 -10 5 z'
        })
    }
}

class CustomEdgeModel extends PolylineEdgeModel {
    getData(): ExtendEdgeData {
        const data = super.getData() as ExtendEdgeData;
        data.sourceAnchorId = this.sourceAnchorId;
        data.targetAnchorId = this.targetAnchorId;
        return data;
    }

    setAttributes(): void {
        this.isAnimation = true;
    }

    getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle();
        style.strokeDasharray = "5 5";
        style.animationDuration = "10s";
        return style;
    }

    getEdgeStyle() {
        const style = super.getEdgeStyle();
        const { properties } = this;
        if (properties.isActived) {
            style.strokeDasharray = "4 4";
        }
        style.stroke = "orange";
        return style;
    }
    getTextStyle() {
        const style = super.getTextStyle();
        style.color = "#3451F1";
        style.fontSize = 20;
        style.background && (style.background.fill = "#F2F131");
        return style;
    }
    getOutlineStyle() {
        const style = super.getOutlineStyle();
        style.stroke = "red";
        style.hover && (style.hover.stroke = "red");
        return style;
    }
}

export default {
    type: "CustomEdge",
    view: CustomEdgeNode,
    model: CustomEdgeModel,
}