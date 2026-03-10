# ArchTrade – Running the website locally

## Setup

1. **Put the executable in the same folder as the server**
   - Place `ArchTrade_web.exe` in the same directory as `server.py`.
   - Folder layout:
     ```
     your_folder/
       server.py
       ArchTrade_web.exe
       templates/
         index.html
     ```

2. **Install Flask** (one-time)
   ```bash
   pip install flask
   ```

## Run the website

1. Open a terminal in the folder that contains `server.py` and `ArchTrade_web.exe`.

2. Start the Flask server:
   ```bash
   python server.py
   ```

3. Open a browser and go to:
   ```
   http://127.0.0.1:5000
   ```

4. Use the form:
   - Choose **Workload**, **Instruction set**, **Pipeline type**, **Cache type**, and **IO method** from the dropdowns.
   - Click **Run Simulation**.
   - The simulator output appears in the "Simulation output" box below.

## Notes

- The site runs only on your machine (localhost). No one else on the network can access it unless you change the server settings.
- The C++ executable must accept five command-line arguments in this order:  
  `workload` `instruction_set` `pipeline` `cache` `io_type`  
  Use the same values as in the dropdowns (e.g. `fibonacci`, `risc`, `single_cycle`, `direct_mapped`, `polling`).
- If your current ArchTrade build only uses a menu and `std::cin`, add a small wrapper that reads `argc`/`argv` and, when 6 arguments are given, runs the simulator with those values instead of prompting.
