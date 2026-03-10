"""
ArchTrade - Web backend
Runs the C++ simulator (ArchTrade_web.exe) using subprocess.
Executable and server must be in the same folder.
"""

import subprocess
from pathlib import Path

from flask import Flask, render_template, request, jsonify

# Project root = folder containing server.py; templates live here too
BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__, template_folder=str(BASE_DIR / "templates"))
EXE = BASE_DIR / "ArchTrade_web.exe"

# Options (must match what the C++ executable expects as arguments)
WORKLOADS = [
    "fibonacci",
    "matrix_multiply",
    "array_sum",
    "bubble_sort",
    "random_memory_access",
    "io_processing",
]
INSTRUCTION_SETS = ["risc", "cisc"]
PIPELINES = ["single_cycle", "5_stage"]
CACHES = ["direct_mapped", "set_associative"]
IO_TYPES = ["polling", "dma"]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/run", methods=["POST"])
def run_simulation():
    data = request.get_json() or {}
    workload = data.get("workload", "fibonacci")
    instruction_set = data.get("instruction_set", "risc")
    pipeline = data.get("pipeline", "single_cycle")
    cache = data.get("cache", "direct_mapped")
    io_type = data.get("io_type", "polling")

    if workload not in WORKLOADS:
        return jsonify({"ok": False, "error": f"Invalid workload: {workload}"}), 400
    if instruction_set not in INSTRUCTION_SETS:
        return jsonify({"ok": False, "error": f"Invalid instruction set: {instruction_set}"}), 400
    if pipeline not in PIPELINES:
        return jsonify({"ok": False, "error": f"Invalid pipeline: {pipeline}"}), 400
    if cache not in CACHES:
        return jsonify({"ok": False, "error": f"Invalid cache: {cache}"}), 400
    if io_type not in IO_TYPES:
        return jsonify({"ok": False, "error": f"Invalid I/O type: {io_type}"}), 400

    if not EXE.is_file():
        return jsonify({
            "ok": False,
            "error": f"ArchTrade_web.exe not found in {BASE_DIR}. Place the executable in the same folder as server.py."
        }), 500

    args = [str(EXE), workload, instruction_set, pipeline, cache, io_type]
    try:
        output = subprocess.check_output(
            args,
            cwd=str(BASE_DIR),
            text=True,
            timeout=30,
        )
        return jsonify({"ok": True, "output": output or ""})
    except subprocess.CalledProcessError as e:
        stdout = (e.output or "").strip()
        return jsonify({
            "ok": False,
            "error": f"Simulator exited with code {e.returncode}",
            "output": stdout,
        }), 500
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "Simulation timed out (30s limit)."}), 500
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="127.0.0.1")
