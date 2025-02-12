import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.signal import find_peaks

# Directory containing the CSV files
directory = "E:/Piezo(124)/"  # Change this if needed
plot_directory = os.path.join(directory, "plots")
os.makedirs(plot_directory, exist_ok=True)  # Ensure output folder exists

# File range based on provided filenames
file_prefix = "TEK"
file_extension = ".CSV"
file_range = range(0, 125)  # Files from TEK00000 to TEK00124

# Initialize results list
results = []

# Function to process each file
def process_file(file_path, file_name):
    df = pd.read_csv(file_path, skiprows=20)  # Adjust skiprows if needed
    
    time = df.iloc[:, 0].values  # Time in seconds
    voltage = df.iloc[:, 1].values  # Voltage values

    dt = np.mean(np.diff(time))  # Sampling interval
    fs = 1 / dt  # Sampling frequency
    N = len(voltage)  # Number of samples
    freqs = np.fft.fftfreq(N, d=dt)  # Frequency bins
    fft_values = np.fft.fft(voltage)  # Compute FFT

    magnitude = np.abs(fft_values)[:N // 2]  # Magnitude response (only positive freqs)
    phase = np.angle(fft_values, deg=True)[:N // 2]  # Phase response (degrees)
    freqs_half = freqs[:N // 2]  # Positive frequencies

    # Find resonant peaks
    peaks, _ = find_peaks(magnitude, height=max(magnitude) * 0.5)  # Adjust threshold
    resonant_freqs = freqs_half[peaks]

    # Calculate Quality Factor (Q)
    q_factors = []
    for f_r in resonant_freqs:
        # Find bandwidth (FWHM method)
        bandwidth = np.abs(freqs_half[np.where(magnitude < magnitude[peaks].max() / np.sqrt(2))][-1] - f_r)
        q_factors.append(f_r / bandwidth if bandwidth != 0 else np.nan)

    # Save results
    for f_r, q in zip(resonant_freqs, q_factors):
        results.append([file_name, f_r, q])

    # Plot and save magnitude & phase response
    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    plt.plot(freqs_half, magnitude, label="Magnitude Response", color='b')
    plt.scatter(resonant_freqs, magnitude[peaks], color='r', label="Resonant Peaks")
    plt.xlabel("Frequency (Hz)")
    plt.ylabel("Magnitude")
    plt.title("Magnitude Response")
    plt.legend()
    plt.grid()

    plt.subplot(1, 2, 2)
    plt.plot(freqs_half, phase, label="Phase Response", color='r')
    plt.xlabel("Frequency (Hz)")
    plt.ylabel("Phase (degrees)")
    plt.title("Phase Response")
    plt.legend()
    plt.grid()

    plt.tight_layout()
    plt.savefig(os.path.join(plot_directory, f"{file_name}.png"))  # Save plot
    plt.close()

# Process all files
for i in file_range:
    file_name = f"{file_prefix}{i:05d}{file_extension}"
    file_path = os.path.join(directory, file_name)

    if os.path.exists(file_path):
        process_file(file_path, file_name)
    else:
        print(f"Warning: File {file_name} not found, skipping.")

# Save results to CSV
results_df = pd.DataFrame(results, columns=["File Name", "Resonant Frequency (Hz)", "Quality Factor (Q)"])
results_df.to_csv(os.path.join(directory, "resonance_results.csv"), index=False)

print("Processing complete! Results saved.")