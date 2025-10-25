import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Canvas, Path, Line, Circle, Text as SkiaText, useFont } from '@shopify/react-native-skia';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { create, all } from 'mathjs';

const math = create(all);
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRAPH_SIZE = SCREEN_WIDTH - 32;
const GRAPH_RANGE = 10;

interface FunctionPlot {
  id: string;
  equation: string;
  color: string;
  visible: boolean;
}

export const GraphingCalculator: React.FC = () => {
  const isDarkMode = useCalculatorStore((state) => state.isDarkMode);
  const premium = useCalculatorStore((state) => state.premium);
  const theme = getTheme(isDarkMode);

  const [functions, setFunctions] = useState<FunctionPlot[]>([
    { id: '1', equation: 'x^2', color: '#2196F3', visible: true },
  ]);
  const [newEquation, setNewEquation] = useState('');
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [traceMode, setTraceMode] = useState(false);
  const [traceX, setTraceX] = useState(0);

  // Check premium access
  if (!premium.isPremium && !premium.graphingUnlocked) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.premiumLock}>
          <Text style={[styles.premiumTitle, { color: theme.textPrimary }]}>
            Graphing Calculator
          </Text>
          <Text style={[styles.premiumMessage, { color: theme.textSecondary }]}>
            This is a premium feature. Unlock graphing capabilities to:
          </Text>
          <View style={styles.featureList}>
            <Text style={[styles.featureItem, { color: theme.textSecondary }]}>
              • Plot multiple functions simultaneously
            </Text>
            <Text style={[styles.featureItem, { color: theme.textSecondary }]}>
              • Zoom and pan to explore graphs
            </Text>
            <Text style={[styles.featureItem, { color: theme.textSecondary }]}>
              • Trace function values
            </Text>
            <Text style={[styles.featureItem, { color: theme.textSecondary }]}>
              • Find intersections and critical points
            </Text>
            <Text style={[styles.featureItem, { color: theme.textSecondary }]}>
              • Calculate derivatives and integrals
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.unlockButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              // Navigate to premium screen
              alert('Premium upgrade coming soon!');
            }}
          >
            <Text style={styles.unlockButtonText}>Unlock Premium</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Evaluate function at given x
  const evaluateFunction = (equation: string, x: number): number | null => {
    try {
      const scope = { x };
      const result = math.evaluate(equation, scope);
      return typeof result === 'number' && isFinite(result) ? result : null;
    } catch {
      return null;
    }
  };

  // Generate path for function
  const generatePath = (equation: string): string => {
    const points: string[] = [];
    const step = (GRAPH_RANGE * 2 * zoom) / GRAPH_SIZE;

    for (let i = 0; i <= GRAPH_SIZE; i++) {
      const x = -GRAPH_RANGE * zoom + i * step + panX;
      const y = evaluateFunction(equation, x);

      if (y !== null) {
        const screenX = i;
        const screenY = GRAPH_SIZE / 2 - (y - panY) * (GRAPH_SIZE / (GRAPH_RANGE * 2 * zoom));

        if (screenY >= 0 && screenY <= GRAPH_SIZE) {
          if (points.length === 0) {
            points.push(`M ${screenX} ${screenY}`);
          } else {
            points.push(`L ${screenX} ${screenY}`);
          }
        }
      }
    }

    return points.join(' ');
  };

  // Add new function
  const addFunction = () => {
    if (newEquation.trim()) {
      const colors = ['#2196F3', '#F44336', '#4CAF50', '#FF9800', '#9C27B0'];
      const color = colors[functions.length % colors.length];

      setFunctions([
        ...functions,
        {
          id: Date.now().toString(),
          equation: newEquation.trim(),
          color,
          visible: true,
        },
      ]);
      setNewEquation('');
    }
  };

  // Toggle function visibility
  const toggleFunction = (id: string) => {
    setFunctions(
      functions.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f))
    );
  };

  // Remove function
  const removeFunction = (id: string) => {
    setFunctions(functions.filter((f) => f.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Graphing Calculator</Text>
      </View>

      {/* Graph Canvas */}
      <View style={[styles.graphContainer, { backgroundColor: theme.displayBg }]}>
        <Canvas style={{ width: GRAPH_SIZE, height: GRAPH_SIZE }}>
          {/* Grid lines */}
          {Array.from({ length: 21 }).map((_, i) => {
            const pos = (i * GRAPH_SIZE) / 20;
            return (
              <React.Fragment key={i}>
                <Line
                  p1={{ x: pos, y: 0 }}
                  p2={{ x: pos, y: GRAPH_SIZE }}
                  color={theme.border}
                  style="stroke"
                  strokeWidth={i === 10 ? 2 : 0.5}
                />
                <Line
                  p1={{ x: 0, y: pos }}
                  p2={{ x: GRAPH_SIZE, y: pos }}
                  color={theme.border}
                  style="stroke"
                  strokeWidth={i === 10 ? 2 : 0.5}
                />
              </React.Fragment>
            );
          })}

          {/* Function plots */}
          {functions.map((func) => {
            if (!func.visible) return null;
            const pathData = generatePath(func.equation);
            return (
              <Path
                key={func.id}
                path={pathData}
                color={func.color}
                style="stroke"
                strokeWidth={2}
              />
            );
          })}

          {/* Trace point */}
          {traceMode && (
            <Circle
              cx={GRAPH_SIZE / 2}
              cy={
                GRAPH_SIZE / 2 -
                (evaluateFunction(functions[0]?.equation || '', traceX) || 0) *
                  (GRAPH_SIZE / (GRAPH_RANGE * 2 * zoom))
              }
              r={5}
              color={theme.primary}
            />
          )}
        </Canvas>

        {/* Trace value display */}
        {traceMode && (
          <View style={[styles.traceDisplay, { backgroundColor: theme.buttonBg }]}>
            <Text style={[styles.traceText, { color: theme.textPrimary }]}>
              x: {traceX.toFixed(2)}
            </Text>
            <Text style={[styles.traceText, { color: theme.textPrimary }]}>
              y: {(evaluateFunction(functions[0]?.equation || '', traceX) || 0).toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.zoomControls}>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.buttonBg }]}
            onPress={() => setZoom(Math.max(0.5, zoom - 0.5))}
          >
            <Text style={[styles.controlButtonText, { color: theme.textPrimary }]}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.zoomText, { color: theme.textPrimary }]}>
            Zoom: {zoom.toFixed(1)}x
          </Text>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.buttonBg }]}
            onPress={() => setZoom(Math.min(5, zoom + 0.5))}
          >
            <Text style={[styles.controlButtonText, { color: theme.textPrimary }]}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.traceButton,
            { backgroundColor: traceMode ? theme.primary : theme.buttonBg },
          ]}
          onPress={() => setTraceMode(!traceMode)}
        >
          <Text
            style={[
              styles.traceButtonText,
              { color: traceMode ? '#FFFFFF' : theme.textPrimary },
            ]}
          >
            {traceMode ? 'Exit Trace' : 'Trace Mode'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: theme.accent }]}
          onPress={() => {
            setZoom(1);
            setPanX(0);
            setPanY(0);
          }}
        >
          <Text style={styles.resetButtonText}>Reset View</Text>
        </TouchableOpacity>
      </View>

      {/* Function list */}
      <ScrollView style={styles.functionList}>
        {functions.map((func, index) => (
          <View
            key={func.id}
            style={[styles.functionItem, { backgroundColor: theme.displayBg }]}
          >
            <TouchableOpacity
              style={[styles.colorIndicator, { backgroundColor: func.color }]}
              onPress={() => toggleFunction(func.id)}
            >
              {!func.visible && <Text style={styles.hiddenText}>✕</Text>}
            </TouchableOpacity>
            <Text style={[styles.functionEquation, { color: theme.textPrimary }]}>
              y = {func.equation}
            </Text>
            {functions.length > 1 && (
              <TouchableOpacity onPress={() => removeFunction(func.id)}>
                <Text style={[styles.removeButton, { color: theme.danger }]}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Add function input */}
      <View style={[styles.inputContainer, { backgroundColor: theme.displayBg }]}>
        <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>y =</Text>
        <TextInput
          style={[styles.input, { color: theme.textPrimary, borderColor: theme.border }]}
          value={newEquation}
          onChangeText={setNewEquation}
          placeholder="Enter equation (e.g., sin(x), x^2)"
          placeholderTextColor={theme.textSecondary}
          onSubmitEditing={addFunction}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={addFunction}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  graphContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  zoomText: {
    marginHorizontal: 12,
    fontSize: 14,
  },
  traceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  traceButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  traceDisplay: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    borderRadius: 8,
  },
  traceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  functionList: {
    maxHeight: 120,
    paddingHorizontal: 16,
  },
  functionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  functionEquation: {
    flex: 1,
    fontSize: 16,
  },
  removeButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  premiumLock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  premiumTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  premiumMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  featureList: {
    marginBottom: 32,
  },
  featureItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  unlockButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
