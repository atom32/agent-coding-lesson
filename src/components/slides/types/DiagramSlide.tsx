"use client";

import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import { getFlowForVersion } from "@/data/execution-flows";
import type { DiagramSlide as DiagramSlideType } from "@/types/slides";
import type { FlowNode, FlowEdge } from "@/types/agent-data";

interface DiagramSlideProps {
  slide: DiagramSlideType;
}

export function DiagramSlide({ slide }: DiagramSlideProps) {
  const flow = getFlowForVersion(slide.flowId);

  if (!flow) {
    return (
      <div className="text-center text-zinc-500">
        Flow not found: {slide.flowId}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <GitBranch className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            {slide.title}
          </h2>
        </div>
      </motion.div>

      {slide.description && (
        <motion.p
          variants={staggerItem}
          className="text-lg text-zinc-600 dark:text-zinc-400 mb-8"
        >
          {slide.description}
        </motion.p>
      )}

      <motion.div
        variants={staggerItem}
        className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
      >
        <svg
          width="100%"
          height="500"
          viewBox="0 0 600 500"
          className="max-w-2xl mx-auto"
        >
          {/* Edges */}
          {flow.edges.map((edge, index) => (
            <g key={`edge-${index}`}>
              <EdgeComponent edge={edge} nodes={flow.nodes} />
            </g>
          ))}

          {/* Nodes */}
          {flow.nodes.map((node) => (
            <g key={node.id}>
              <NodeComponent node={node} />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Legend */}
      <motion.div
        variants={staggerItem}
        className="mt-6 flex flex-wrap justify-center gap-4 text-sm"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Start/End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Process</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Decision</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500"></div>
          <span className="text-zinc-600 dark:text-zinc-400">Subprocess</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NodeComponent({ node }: { node: FlowNode }) {
  const colors = {
    start: "bg-green-500",
    process: "bg-blue-500",
    decision: "bg-amber-500",
    subprocess: "bg-purple-500",
    end: "bg-green-500",
  };

  const darkColors = {
    start: "dark:bg-green-600",
    process: "dark:bg-blue-600",
    decision: "dark:bg-amber-600",
    subprocess: "dark:bg-purple-600",
    end: "dark:bg-green-600",
  };

  return (
    <>
      <rect
        x={node.x - 60}
        y={node.y - 20}
        width="120"
        height="40"
        rx="8"
        className={`fill-zinc-100 dark:fill-zinc-800 stroke-2 ${
          node.type === "start" || node.type === "end"
            ? "stroke-green-500 dark:stroke-green-600"
            : node.type === "process"
            ? "stroke-blue-500 dark:stroke-blue-600"
            : node.type === "decision"
            ? "stroke-amber-500 dark:stroke-amber-600"
            : "stroke-purple-500 dark:stroke-purple-600"
        }`}
      />
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        className="fill-zinc-900 dark:fill-zinc-100 text-xs font-medium pointer-events-none"
      >
        {node.label}
      </text>
    </>
  );
}

function EdgeComponent({ edge, nodes }: { edge: FlowEdge; nodes: FlowNode[] }) {
  const fromNode = nodes.find((n) => n.id === edge.from);
  const toNode = nodes.find((n) => n.id === edge.to);

  if (!fromNode || !toNode) return null;

  return (
    <>
      <defs>
        <marker
          id={`arrowhead-${edge.from}-${edge.to}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3, 0 6"
            className="fill-zinc-400 dark:fill-zinc-600"
          />
        </marker>
      </defs>
      <line
        x1={fromNode.x}
        y1={fromNode.y + 20}
        x2={toNode.x}
        y2={toNode.y - 20}
        className="stroke-zinc-400 dark:stroke-zinc-600 stroke-2"
        markerEnd={`url(#arrowhead-${edge.from}-${edge.to})`}
      />
      {edge.label && (
        <text
          x={(fromNode.x + toNode.x) / 2 + 10}
          y={(fromNode.y + toNode.y) / 2 - 10}
          className="fill-zinc-600 dark:fill-zinc-400 text-xs pointer-events-none"
        >
          {edge.label}
        </text>
      )}
    </>
  );
}
