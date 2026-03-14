import { useState, useRef, useEffect } from "react";
import { PenTool, Type, Trash2 } from "lucide-react";

interface WorkpadProps {
  problemId: string;
  /** Read-only display only (no interaction) */
  preview?: boolean;
  /** Shorter height but fully usable (e.g. bootcamp step 4) */
  compact?: boolean;
}

export function Workpad({ problemId, preview = false, compact = false }: WorkpadProps) {
  const [mode, setMode] = useState<'draw' | 'text'>('draw');
  const [text, setText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Clear workpad when problem changes
  useEffect(() => {
    setText('');
    clearCanvas();
  }, [problemId]);

  // Ensure canvas is sized correctly
  useEffect(() => {
    if (mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    }
  }, [mode]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#4F46E5'; // Indigo 600
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <div className={`flex flex-col w-full bg-white rounded-[8px] border border-slate-200/60 shadow-sm overflow-hidden ${
    preview ? "min-h-0 h-[200px] pointer-events-none" : compact ? "min-h-0 h-[280px]" : "h-full min-h-[400px]"
  }`}>
      {/* Header controls */}
      <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex bg-slate-200/50 p-1 rounded-xl">
          <button 
            onClick={() => setMode('draw')} 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'draw' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <PenTool className="w-4 h-4" />
            Draw
          </button>
          <button 
            onClick={() => setMode('text')} 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'text' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Type className="w-4 h-4" />
            Type
          </button>
        </div>
        
        {mode === 'draw' && (
          <button 
            onClick={clearCanvas} 
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Clear drawing"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Work Area */}
      <div className="flex-1 relative bg-white touch-none">
        {mode === 'draw' && (
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            onMouseMove={draw}
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />
        )}
        
        {mode === 'text' && (
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Work out your thoughts here..."
            className="absolute inset-0 w-full h-full p-6 resize-none outline-none text-slate-700 bg-transparent text-lg leading-relaxed placeholder:text-slate-300"
          />
        )}
      </div>
    </div>
  );
}
