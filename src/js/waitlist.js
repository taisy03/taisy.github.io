document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const messageEl = document.getElementById('message');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      
      if (response.ok) {
        messageEl.textContent = '✅ Thanks for joining! Check your email for confirmation.';
        messageEl.style.color = 'green';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      messageEl.textContent = '⚠️ Something went wrong. Please try again.';
    