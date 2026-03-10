# ArchTrade – Web Setup

Instructions to **compile the C++ simulator** and **run the web server** for the ArchTrade Computer Architecture Simulator.

---

## 1. Compile the C++ simulator

The simulator is in the `simulator` folder. You need to build an executable that accepts five command-line arguments.

### Windows (Command Prompt or PowerShell)

Using **g++** (e.g. from MinGW or MSYS2):

```bat
cd simulator
g++ -o archtrade_sim.exe main.cpp
```

Using **Microsoft Visual C++** (Developer Command Prompt):

```bat
cd simulator
cl /EHsc main.cpp /Fe:archtrade_sim.exe
```

### Linux / macOS

```bash
cd simulator
g++ -o archtrade_sim main.cpp
```

After building, the executable should be:

- **Windows:** `simulator/archtrade_sim.exe`
- **Linux/macOS:** `simulator/archtrade_sim`

You can test it from the command line:

```bash
# Example: Fibonacci, RISC, 5-stage, set associative, DMA
./archtrade_sim fibonacci risc 5_stage set_associative dma
```

---

## 2. Run the web server

### Install Python dependencies

You need Python 3.7+ and Flask:

```bash
pip install flask
```

(Use `pip3` if your system has both Python 2 and 3.)

### Start the Flask app

From the **project root** (the folder that contains `server.py`):

```bash
python server.py
```

Or:

```bash
python3 server.py
```

You should see something like:

```
 * Running on http://127.0.0.1:5000
```

### Use the website

1. Open a browser and go to: **http://127.0.0.1:5000**
2. Choose:
   - **Workload** (e.g. Fibonacci, Matrix Multiply, Array Sum, …)
   - **Instruction set** (RISC / CISC)
   - **Pipeline** (Single Cycle / 5-Stage)
   - **Cache** (Direct Mapped / Set Associative)
   - **I/O type** (Polling / DMA)
3. Click **Run Simulation**.
4. The simulator output will appear in the “Simulation output” box.

---

## 3. Using your own C++ simulator

If you already have a console-based ArchTrade simulator that uses `std::cin`:

1. **Option A – Wrapper:** Keep your current simulator as a library or set of functions. Add a small `main()` (like in `simulator/main.cpp`) that:
   - Reads the five options from `argv`
   - Calls your existing simulation code with those values
   - Prints results to `std::cout`

2. **Option B – Modify main:** In your existing program, change `main()` to:
   - If `argc == 6`, parse `argv[1]` … `argv[5]` and run the simulation once with those options.
   - Otherwise, keep your current menu-driven `std::cin` flow so the program still works in the console.

The executable must accept arguments in this order:

1. `workload`  
   One of: `fibonacci`, `matrix_multiply`, `array_sum`, `bubble_sort`, `random_memory_access`, `io_processing`

2. `instruction_set`  
   `risc` or `cisc`

3. `pipeline`  
   `single_cycle` or `5_stage`

4. `cache`  
   `direct_mapped` or `set_associative`

5. `io_type`  
   `polling` or `dma`

Output should be printed to **stdout**; the web app shows whatever the executable prints.

---

## Summary

| Step | Command |
|------|--------|
| Compile (from `simulator/`) | `g++ -o archtrade_sim.exe main.cpp` (Windows) or `g++ -o archtrade_sim main.cpp` (Linux/macOS) |
| Install Flask | `pip install flask` |
| Run server (from project root) | `python server.py` |
| Open in browser | http://127.0.0.1:5000 |
