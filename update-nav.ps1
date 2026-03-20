$files = Get-ChildItem -Path '.' -Filter '*.html'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Change span labels to <a> links
    $content = $content -replace '<span class="nav-link-label">Life Science</span>', '<a href="life-science.html" class="nav-link-label">Life Science</a>'
    $content = $content -replace '<span class="nav-link-label">Earth Science</span>', '<a href="earth-science.html" class="nav-link-label">Earth Science</a>'
    $content = $content -replace '<span class="nav-link-label">Physical Science</span>', '<a href="physical-science.html" class="nav-link-label">Physical Science</a>'

    # Remove the "Overview" link from Life Science dropdown
    $content = $content -replace '\s*<a href="life-science.html">Overview</a>', ''
    
    # Remove the "Overview" link from Earth Science dropdown
    $content = $content -replace '<a href="earth-science.html">Overview</a>', ''
    
    # Remove the "Overview" link from Physical Science dropdown
    $content = $content -replace '<a href="physical-science.html">Overview</a>', ''

    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Output "Updated: $($file.Name)"
}
