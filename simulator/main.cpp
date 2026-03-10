/**
 * ArchTrade - Computer Architecture Simulator (CLI wrapper)
 *
 * Accepts command-line arguments instead of interactive cin.
 * Usage: archtrade_sim <workload> <instruction_set> <pipeline> <cache> <io_type>
 *
 * Replace this with your real simulator by either:
 * - Linking this main with your existing simulation logic, or
 * - Modifying your existing main() to parse argv and call your run() with those values.
 */

#include <iostream>
#include <string>
#include <cstdlib>
#include <map>

// --- Simulator configuration (matches your architecture options) ---
enum class Workload {
    Fibonacci, MatrixMultiply, ArraySum, BubbleSort, RandomMemoryAccess, IOProcessing
};

enum class InstructionSet { RISC, CISC };
enum class PipelineConfig { SingleCycle, FiveStage };
enum class CacheType { DirectMapped, SetAssociative };
enum class IOType { Polling, DMA };

static const std::map<std::string, Workload> workloadMap = {
    {"fibonacci", Workload::Fibonacci},
    {"matrix_multiply", Workload::MatrixMultiply},
    {"array_sum", Workload::ArraySum},
    {"bubble_sort", Workload::BubbleSort},
    {"random_memory_access", Workload::RandomMemoryAccess},
    {"io_processing", Workload::IOProcessing}
};

static const std::map<std::string, InstructionSet> isaMap = {
    {"risc", InstructionSet::RISC},
    {"cisc", InstructionSet::CISC}
};

static const std::map<std::string, PipelineConfig> pipelineMap = {
    {"single_cycle", PipelineConfig::SingleCycle},
    {"5_stage", PipelineConfig::FiveStage}
};

static const std::map<std::string, CacheType> cacheMap = {
    {"direct_mapped", CacheType::DirectMapped},
    {"set_associative", CacheType::SetAssociative}
};

static const std::map<std::string, IOType> ioMap = {
    {"polling", IOType::Polling},
    {"dma", IOType::DMA}
};

// --- Core simulation logic (simplified; replace with your real logic) ---
void runSimulation(Workload w, InstructionSet isa, PipelineConfig pipe, CacheType cache, IOType io) {
    // Simulated metrics based on configuration (replace with your actual simulation)
    int cycles = 1000 + (rand() % 5000);
    int instructions = 500 + (rand() % 2000);
    double cpi = (isa == InstructionSet::RISC) ? 1.2 : 2.1;
    if (pipe == PipelineConfig::FiveStage) cpi *= 0.7;
    int cacheHits = 700 + (rand() % 200);
    int cacheMisses = 50 + (rand() % 100);
    double hitRate = (cache == CacheType::SetAssociative) ? 0.92 : 0.85;

    std::cout << "========== ArchTrade Simulation Results ==========\n\n";
    std::cout << "Configuration:\n";
    std::cout << "  Workload:           ";
    switch (w) {
        case Workload::Fibonacci:           std::cout << "Fibonacci\n"; break;
        case Workload::MatrixMultiply:      std::cout << "Matrix Multiply\n"; break;
        case Workload::ArraySum:            std::cout << "Array Sum\n"; break;
        case Workload::BubbleSort:          std::cout << "Bubble Sort\n"; break;
        case Workload::RandomMemoryAccess:  std::cout << "Random Memory Access\n"; break;
        case Workload::IOProcessing:        std::cout << "IO Processing\n"; break;
    }
    std::cout << "  Instruction Set:    " << (isa == InstructionSet::RISC ? "RISC" : "CISC") << "\n";
    std::cout << "  Pipeline:           " << (pipe == PipelineConfig::SingleCycle ? "Single Cycle" : "5-Stage") << "\n";
    std::cout << "  Cache:              " << (cache == CacheType::DirectMapped ? "Direct Mapped" : "Set Associative") << "\n";
    std::cout << "  I/O Method:         " << (io == IOType::Polling ? "Polling" : "DMA") << "\n\n";

    std::cout << "Results:\n";
    std::cout << "  Total Cycles:       " << cycles << "\n";
    std::cout << "  Instructions:       " << instructions << "\n";
    std::cout << "  CPI (avg):          " << cpi << "\n";
    std::cout << "  Cache Hits:         " << cacheHits << "\n";
    std::cout << "  Cache Misses:       " << cacheMisses << "\n";
    std::cout << "  Cache Hit Rate:     " << (hitRate * 100) << "%\n";
    std::cout << "\n========== End of Simulation ==========\n";
}

int main(int argc, char* argv[]) {
    if (argc != 6) {
        std::cerr << "Usage: archtrade_sim <workload> <instruction_set> <pipeline> <cache> <io_type>\n";
        std::cerr << "  workload:        fibonacci|matrix_multiply|array_sum|bubble_sort|random_memory_access|io_processing\n";
        std::cerr << "  instruction_set: risc|cisc\n";
        std::cerr << "  pipeline:        single_cycle|5_stage\n";
        std::cerr << "  cache:           direct_mapped|set_associative\n";
        std::cerr << "  io_type:         polling|dma\n";
        return 1;
    }

    std::string workloadStr(argv[1]);
    std::string isaStr(argv[2]);
    std::string pipelineStr(argv[3]);
    std::string cacheStr(argv[4]);
    std::string ioStr(argv[5]);

    auto wIt = workloadMap.find(workloadStr);
    auto isaIt = isaMap.find(isaStr);
    auto pipeIt = pipelineMap.find(pipelineStr);
    auto cacheIt = cacheMap.find(cacheStr);
    auto ioIt = ioMap.find(ioStr);

    if (wIt == workloadMap.end() || isaIt == isaMap.end() || pipeIt == pipelineMap.end() ||
        cacheIt == cacheMap.end() || ioIt == ioMap.end()) {
        std::cerr << "Error: Invalid option. Use exact values as shown in usage.\n";
        return 1;
    }

    runSimulation(wIt->second, isaIt->second, pipeIt->second, cacheIt->second, ioIt->second);
    return 0;
}
