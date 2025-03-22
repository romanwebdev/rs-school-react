# Performance Summary

The React Profiler was used to measure and analyze the rendering performance of the application. I measured the performance by setting regions as 'All' and changing the sorting of all cards in the application. Below are the key findings:

## Initial Profiling Without Optimization

- **Commit Duration:** 1.6s
- **Render Duration:** 9.6ms
- **Flame Graph:**
  ![Flame Graph](./public/before_optimization_flamegraph.png)
- **Ranked Chart:**  
  ![Ranked Chart](./public/before_optimization_ranked.png)
- **Interactions:**  
  ![Interactions](./public/before_optimization_interactions.png)

## Updated with React.memo and useMemo

- **Commit Duration:** 1.4s
- **Render Duration:** 1.8ms
- **Flame Graph:**
  ![Flame Graph](./public/after_optimization_flamegraph.png)
- **Ranked Chart:**  
  ![Ranked Chart](./public/after_optimization_ranked.png)
- **Interactions:**  
  ![Interactions](./public/after_optimization_interactions.png)
