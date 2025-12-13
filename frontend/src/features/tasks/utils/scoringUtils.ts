import { Task } from '../types';

export const calculateTaskPoints = (task: Task, actualTime: number) => {
  // 1. Base Score (Difficulty Proxy)
  // بما أننا لا نملك حقل صعوبة، سنعتبر الأساس 5 نقاط
  const BASE_SCORE = 5;

  // 2. Size Factor (Based on Expected Time or Type)
  let sizeFactor = 1.0;
  if (task.type === 'big_task') {
    sizeFactor = 2.0; // Project
  } else {
    if (task.expectedTime < 30) sizeFactor = 1.0;      // Small
    else if (task.expectedTime <= 90) sizeFactor = 1.2; // Medium
    else sizeFactor = 1.5;                             // Large
  }

  // 3. Priority Factor (As per doc)
  const priorityFactor = 
    task.priority === 'urgent' ? 2.0 :
    task.priority === 'high' ? 1.7 :
    task.priority === 'medium' ? 1.3 : 
    1.0; // Low

  // 4. Time Multiplier
  let timeMultiplier = 1.0;
  const diff = task.expectedTime - actualTime;

  if (diff >= 0) {
    // Early Finish or Exact Time
    timeMultiplier = 1.5; 
  } else if (Math.abs(diff) <= 15) {
    // Accuracy Buffer (Late but within 15 mins)
    timeMultiplier = 1.2;
  } else {
    // Late (> 15 mins)
    timeMultiplier = 1.0;
  }

  // Final Calculation
  const rawScore = (BASE_SCORE * sizeFactor * priorityFactor) * timeMultiplier;
  
  // Return rounded score
  return Math.round(rawScore * 10) / 10;
};

export const getPointsBreakdown = (task: Task, actualTime: number) => {
  const total = calculateTaskPoints(task, actualTime);
  
  // Calculate Base Portion (Before Time Multiplier)
  let sizeFactor = task.type === 'big_task' ? 2.0 : (task.expectedTime < 30 ? 1.0 : task.expectedTime <= 90 ? 1.2 : 1.5);
  const priorityFactor = task.priority === 'urgent' ? 2.0 : task.priority === 'high' ? 1.7 : task.priority === 'medium' ? 1.3 : 1.0;
  
  const basePortion = Math.round((5 * sizeFactor * priorityFactor) * 10) / 10;
  const bonusPortion = Math.round((total - basePortion) * 10) / 10;

  return {
    total,
    base: basePortion,
    bonus: bonusPortion
  };
};